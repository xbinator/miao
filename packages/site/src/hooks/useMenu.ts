import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export interface MenuItem {
  // 标题
  title: string;
  // 路径
  path: string;
  // 子菜单
  children?: MenuItem[];
}

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

  return { menus, activeMenuItem };
}
