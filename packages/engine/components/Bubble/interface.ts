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
  // 头像信息
  avatar?: BubbleAvatarProps | boolean;
}

export interface BubbleTextProps extends BubbleProps {
  typing?: TypingOption | boolean;

  content?: string;
}

export interface BubbleAvatarProps {
  src?: string;

  size?: number;

  title?: string;
}
