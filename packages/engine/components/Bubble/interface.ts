export interface BubbleAvatarProps {
  src?: string;

  title?: string;
}

export type BubbleToolbar = 'copy' | 'reset' | 'like' | 'dislike';

export interface BubbleToolbarProps {
  // 启用工具
  toolbar?: boolean | BubbleToolbar[];
  // 赞 / 踩
  feedback?: number;
}

export interface BubbleProps extends BubbleToolbarProps {
  // 信息位置
  placement?: 'start' | 'end';
  // 头像信息
  avatar?: BubbleAvatarProps | boolean;
  // 加载状态
  loading?: boolean;
  // 展示收起按钮
  collapse?: boolean;
  // 尺寸
  size?: 'auto' | 'fill';
  // 流式数据状态
  status?: 'wait' | 'output' | 'complete';
}

export interface BubbleActionOptions {
  name: BubbleToolbar;
}
