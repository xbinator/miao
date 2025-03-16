import { BubbleProps } from '../Bubble/interface';

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

export interface BubbleTextProps extends Omit<BubbleProps, 'isTyping'> {
  typing?: TypingOption | boolean;

  content?: string;

  reasonContent?: string;
}
