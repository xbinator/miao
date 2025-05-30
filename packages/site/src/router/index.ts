import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import components, { demos } from './demo-routes';

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
    children: [
      {
        path: 'overview',
        component: () => import('@/views/overview/index.md'),
        meta: { title: '快速上手', group: { title: '组件总览', order: 0 } }
      },
      ...components
    ]
  },
  {
    path: '/demo',
    children: demos
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
  },
  { path: '/:allMatch(.*)*', name: 'NotFound', redirect: '/docs/introduce' }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
