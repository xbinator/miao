export enum UserType {
  // 发送者
  SENDER = 1,
  // 接收者
  RECEIVER = 2
}

export interface Message {
  // 消息类型
  contentType: 'text' | 'recorder' | 'image';
  // 发送者
  userType: UserType;
  // 消息 id
  messageId: string;
  // 回话 id
  sessionId?: string;
  // 文本内容
  text?: string;
  // 思考
  think?: string;
  // 文件
  file?: Blob;
}
