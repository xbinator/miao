import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { flatMap, groupBy, sortBy } from 'lodash-es';

export interface MenuItem {
  // 标题
  title: string;
  // 路径
  path: string;
  //
  subtitle?: string;
  //
  name: string;
  //
  simulator?: boolean;
}

export interface MenuGroup {
  // 标题
  title: string;
  // 排序
  order: number;
  // 子菜单
  children: MenuItem[];
}

const typeOrder = {
  组件总览: { order: -1 },
  通用: { order: 0 },
  布局: { order: 1 },
  表达: { order: 2 }
};

export function useMenu() {
  const route = useRoute();
  const router = useRouter();

  const routes = router.getRoutes();

  const menus = computed<MenuItem[]>(() => {
    const { path } = route;

    const category = path.split('/')[1];

    const ms = routes.filter((r) => RegExp(`^/${category}`).test(r.path) && r.meta.title).map((r) => ({ ...r.meta, path: r.path })) as MenuItem[];

    return ms;
  });

  const activeMenuItem = computed(() => route.path);

  const currentMenuItem = computed(() => {
    return menus.value.find((m) => m.path === activeMenuItem.value);
  });

  const dataSource = computed(() => {
    const group = groupBy(menus.value, (m: any) => m.group?.title);

    const keys: string[] = Object.keys(group);

    const newMenus = keys
      .map((key) => ({ title: key, order: typeOrder[key]?.order, children: sortBy(group[key], 'group.order') }))
      .sort((a, b) => a.order - b.order)
      .map((m) => (m.order === -1 ? m.children : m)) as MenuGroup[];

    return keys.length === 1 ? menus.value : flatMap(newMenus, (m) => m);
  });

  return { menus, dataSource, activeMenuItem, currentMenuItem };
}
