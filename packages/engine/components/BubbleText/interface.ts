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

export interface BubbleTextProps extends BubbleProps {
  typing?: TypingOption | boolean;

  content?: string;

  think?: string;
}

export type BubbleTextActionOptions = BubbleActionOptions | { name: 'typing-complete' };
