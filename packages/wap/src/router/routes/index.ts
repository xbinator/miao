import type { RouteRecordRaw } from 'vue-router';
import { MODULE_LAYOUT_COMPONENT } from '../constant';
import { pages } from '@/constant/pages';

type RouterRowMap = Record<string, { default: RouteRecordRaw[] }>;

const root: RouterRowMap = import.meta.glob('./default/**.ts', { eager: true });

const modules: RouterRowMap = import.meta.glob('./modules/**.ts', { eager: true });

function transformRouteToVueRoutes(route: RouterRowMap) {
  const routers = Object.values(route).map((module) => module.default);

  return routers.flat(1);
}

// 主框架根路由
const Modules: RouteRecordRaw = {
  path: '/',
  name: 'module-router',
  redirect: { name: pages.BASE_OVERVIEW },
  component: MODULE_LAYOUT_COMPONENT,
  children: transformRouteToVueRoutes(modules)
};

const routers = transformRouteToVueRoutes(root);

export const basicRoutes = [Modules, ...routers];
