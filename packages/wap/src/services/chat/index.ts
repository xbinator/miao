import type { Message } from './type';
import { useStream } from '@miao/engine';
import { SEND_MESSAGE } from './api';
import { safeJsonParse } from '@/utils/tools';

export function sendMessage() {
  return useStream<Message>(SEND_MESSAGE, { transformStream: (message) => safeJsonParse(message.data) });
}
