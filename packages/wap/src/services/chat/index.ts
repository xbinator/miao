import type { Message } from './type';
import { useStream } from '@miao/engine';
import { SEND_MESSAGE } from './api';

export function sendMessage() {
  return useStream<Message>(SEND_MESSAGE);
}
