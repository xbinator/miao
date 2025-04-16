export interface SenderProps {
  // 占位符
  placeholder?: string;
  // 输入内容
  value?: string;
  // 加载
  loading?: boolean;
  // 是否允许语音输入
  allowSpeech?: boolean;
}

export interface SenderSpeechActionOptions {
  name: 'error';

  message: string;
}

export type SenderActionOptions = SenderSpeechActionOptions;

export type SenderResult = { value: string; mode: 'text' } | { value: Blob; mode: 'voice' };
