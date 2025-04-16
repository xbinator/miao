import type { AppRouteRecordRaw } from '@/router/type';

const routes: AppRouteRecordRaw[] = [
  {
    path: '/overview',
    name: 'overview-page',
    component: () => import('@/views/overview/index.vue'),
    meta: {}
  }
];

export default routes;
