export interface Message {
  // 消息类型
  type: 'text' | 'recorder' | 'image';
  // 发送者
  role: 'assistant' | 'user';
  // 消息 id
  messageId: string;
  // 回话 id
  sessionId?: string;
  // 文本内容
  content?: string;
  // 文件
  file?: Blob;
}
