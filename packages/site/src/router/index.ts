import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import components from './demo-routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/docs/introduce'
  },
  {
    path: '/docs',
    component: () => import('@/layout/index.vue'),
    redirect: '/docs/introduce',
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
    children: components
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
  history: createWebHashHistory(),
  routes
});
