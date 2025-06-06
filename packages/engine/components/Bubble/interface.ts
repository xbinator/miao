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

export interface CollapseOptions {
  // 默认值
  defaultValue?: boolean;
  // 最大高度
  maxHeight?: number;
}

export interface BubbleProps extends BubbleToolbarProps {
  // 信息位置
  placement?: 'left' | 'right';
  // 头像信息
  avatar?: BubbleAvatarProps | boolean;
  // 加载状态
  loading?: boolean;
  // 是否使用
  isCollapse?: boolean;
  // 展示收起按钮
  collapseOptions?: CollapseOptions;
  // 尺寸
  size?: 'auto' | 'fill';
  // 流式数据状态
  state?: 'wait' | 'output' | 'complete';
}

export interface BubbleActionOptions {
  name: BubbleToolbar;
}
