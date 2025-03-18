import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/docs',
    component: () => import('@/layout/index.vue'),
    redirect: '/docs/getting-started',
    children: [
      {
        path: 'introduce',
        component: () => import('@/views/docs/introduce.md'),
        meta: { title: 'Miao Chat Design' }
      },
      {
        path: 'getting-started',
        component: () => import('@/views/docs/getting-started.md'),
        meta: { title: '快速上手' }
      }
    ]
  },
  {
    path: '/components',
    component: () => import('@/layout/index.vue'),
    redirect: '/components/overview',
    children: [
      {
        path: 'overview',
        component: () => import('@/views/components/overview/index.md'),
        meta: { title: '组件总览' }
      },
      {
        path: '331',
        component: () => import('@/views/components/bubble/index.md'),
        meta: { title: 'bubble' }
      }
    ]
  },
  {
    path: '/playground',
    component: () => import('@/layout/index.vue'),
    redirect: '/playground/independent',
    children: [
      {
        path: 'independent',
        component: () => import('@/views/playground/independent.md'),
        meta: { title: '独立式' }
      }
    ]
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
