export interface PullRefreshProps {
  // 是否禁用下拉刷新
  disabled?: boolean;
  // 顶部内容高度
  headHeight?: number;
  // 触发下拉刷新的距离
  pullDistance?: number;
  // 刷新成功提示展示时长(ms)
  successDuration?: number;
  // 动画时长
  animationDuration?: number;
}
