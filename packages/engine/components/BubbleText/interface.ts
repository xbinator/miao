import { BubbleProps, BubbleActionOptions } from '../Bubble/interface';

export interface TypingOption {
  /**
   * @default 1
   */
  step?: number;
  /**
   * @default 50
   */
  interval?: number;
}

export interface BubbleTextProps extends Omit<BubbleProps, 'isTyping' | 'status'> {
  typing?: TypingOption | boolean;

  content?: string;

  reasonContent?: string;
}

export type BubbleTextActionOptions = BubbleActionOptions | { name: 'typing-complete' };
