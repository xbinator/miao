import type { RouteRecordRaw } from 'vue-router';

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'name'> {
  // 路径别名
  name: string;

  meta?: {
    // 页面标题
    title?: string;
    // 缓存不活动的组件
    keepAlive?: boolean;
    // 忽略身份验证
    ignoreAuth?: boolean;
    // 菜单图标
    icon?: string;
    // 菜单隐藏
    hideInMenu?: boolean;
  };
}
