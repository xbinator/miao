import type { AppRouteRecordRaw } from '@/router/type';

const routes: AppRouteRecordRaw[] = [
  {
    path: '/chat',
    name: 'chat-page',
    component: () => import('@/views/chat/index.vue'),
    meta: {}
  }
];

export default routes;
