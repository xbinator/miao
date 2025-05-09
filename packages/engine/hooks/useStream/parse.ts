/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
export interface EventSourceMessage {
  /** 用于设置EventSource对象最后一个事件ID值的事件ID */
  id: string;
  /** 标识所描述事件类型的字符串 */
  event: string;
  /** 事件数据 */
  data: string;
  /** 重试连接前等待的重新连接间隔（以毫秒为单位） */
  retry?: number;
}

const enum ControlChars {
  NewLine = 10,
  CarriageReturn = 13,
  Space = 32,
  Colon = 58
}

function newMessage(): EventSourceMessage {
  return { data: '', event: '', id: '', retry: undefined };
}

function concat(a: Uint8Array, b: Uint8Array) {
  const res = new Uint8Array(a.length + b.length);
  res.set(a);
  res.set(b, a.length);
  return res;
}

export async function getBytes(stream: ReadableStream<Uint8Array>, onChunk: (arr: Uint8Array) => void) {
  const reader = stream.getReader();

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;

    onChunk(value);
  }
}

export function getLines(onLine: (line: Uint8Array, fieldLength: number) => void) {
  let buffer: Uint8Array | undefined;
  let position: number; // current read position
  let fieldLength: number; // length of the `field` portion of the line
  let discardTrailingNewline = false;

  return function onChunk(arr: Uint8Array) {
    if (buffer === undefined) {
      buffer = arr;
      position = 0;
      fieldLength = -1;
    } else {
      // we're still parsing the old line. Append the new bytes into buffer:
      buffer = concat(buffer, arr);
    }

    const bufLength = buffer.length;
    let lineStart = 0; // index where the current line starts
    while (position < bufLength) {
      if (discardTrailingNewline) {
        if (buffer[position] === ControlChars.NewLine) {
          lineStart = ++position; // skip to next char
        }

        discardTrailingNewline = false;
      }

      let lineEnd = -1;
      for (; position < bufLength && lineEnd === -1; ++position) {
        switch (buffer[position]) {
          case ControlChars.Colon:
            if (fieldLength === -1) {
              // first colon in line
              fieldLength = position - lineStart;
            }
            break;
          // @ts-ignore:7029 \r case below should fallthrough to \n:
          case ControlChars.CarriageReturn:
            discardTrailingNewline = true;
            break;
          case ControlChars.NewLine:
            lineEnd = position;
            break;
          default:
        }
      }

      if (lineEnd === -1) {
        // We reached the end of the buffer but the line hasn't ended.
        // Wait for the next arr and then continue parsing:
        break;
      }

      // we've reached the line end, send it out:
      onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
      lineStart = position; // we're now on the next line
      fieldLength = -1;
    }

    if (lineStart === bufLength) {
      buffer = undefined; // we've finished reading it
    } else if (lineStart !== 0) {
      // Create a new view into buffer beginning at lineStart so we don't
      // need to copy over the previous lines when we get the new arr:
      buffer = buffer.subarray(lineStart);
      position -= lineStart;
    }
  };
}

export function getMessages(onMessage?: (msg: EventSourceMessage) => void, transformStream?: (msg: EventSourceMessage) => any) {
  let message = newMessage();
  const decoder = new TextDecoder();

  return function onLine(line: Uint8Array, fieldLength: number) {
    if (line.length === 0) {
      const _message = transformStream?.(message) || message;

      onMessage?.(_message);

      message = newMessage();
    } else if (fieldLength > 0) {
      const field = decoder.decode(line.subarray(0, fieldLength));
      const valueOffset = fieldLength + (line[fieldLength + 1] === ControlChars.Space ? 2 : 1);
      const value = decoder.decode(line.subarray(valueOffset));

      switch (field) {
        case 'data':
          message.data = message.data ? `${message.data}\n${value}` : value; // otherwise,
          break;
        case 'event':
          message.event = value;
          break;
        case 'id':
          message.id = value;
          break;
        default:
      }
    }
  };
}
