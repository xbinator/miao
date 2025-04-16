import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { basicRoutes } from './routes';

const { VITE_PUBLIC_PATH } = import.meta.env;

export const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHistory(VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  // 滚动行为
  scrollBehavior: (to, from, saved) => (to.name !== from.name ? saved || { left: 0, top: 0 } : undefined)
});

export function setupRouter(app: App<Element>): void {
  app.use(router);
}
