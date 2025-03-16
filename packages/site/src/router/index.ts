import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/docs',
    component: () => import('@/layout/index.vue')
  }
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'auto' };
    }

    return {};
  }
});
