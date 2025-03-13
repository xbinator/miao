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

export interface BubbleProps {
  // 信息位置
  placement?: 'start' | 'end';
}

export interface BubbleTextProps extends BubbleProps {
  typing?: TypingOption | boolean;

  content?: string;
}
