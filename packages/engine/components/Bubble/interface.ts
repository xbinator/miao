export interface BubbleAvatarProps {
  src?: string;

  title?: string;
}

export interface BubbleToolbarProps {
  // 启用工具
  toolbar?: boolean | ('copy' | 'reset' | 'like' | 'dislike')[];

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
  // 是否展示
  isCollapse?: boolean;
  // 流式数据状态
  status?: 'wait' | 'output' | 'complete';
}
