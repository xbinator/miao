import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Plugin } from 'vite';

// 定义路由配置项的类型
interface RouteConfig {
  path: string;
  component: string;
  meta?: Record<string, any>;
}

// 生成路由配置函数
function generateRoutesFromMd(dirPath: string, mdDir: string): RouteConfig[] {
  const routes: RouteConfig[] = [];
  const files = fs.readdirSync(dirPath);

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];

    const filePath = path.join(dirPath, file, 'index.md');

    if (!fs.existsSync(filePath)) continue;

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    let { data: meta } = matter(fileContent);

    const name = path.basename(file, '.md');

    meta = { title: name[0].toLocaleUpperCase() + name.slice(1), ...meta };

    const route = { path: name, component: `() => import('${path.posix.join('@/', mdDir, file, 'index.md')}')`, meta };

    routes.push(route);
  }

  return routes;
}

//
function MarkdownRoutes(mdDir: string): Plugin {
  return {
    name: 'markdown-routes',
    configResolved(config) {
      const resolvedMdDir = path.resolve(config.root, 'src', mdDir);

      const routes = generateRoutesFromMd(resolvedMdDir, mdDir);

      // 将生成的路由配置注入到 Vite 配置中
      const routeConfigFile = path.resolve(config.root, 'src/router', 'demo-routes.ts');

      // 生成 md-routes.ts 文件内容
      let routeConfigContent = 'export default [\n';
      routes.forEach((route) => {
        routeConfigContent += `  {\n`;
        routeConfigContent += `    path: '${route.path}',\n`;
        routeConfigContent += `    component: ${route.component.toString()},\n`;
        routeConfigContent += `    meta: ${JSON.stringify(route.meta)}\n`;
        routeConfigContent += `  },\n`;
      });
      routeConfigContent += '];\n';

      fs.writeFileSync(routeConfigFile, routeConfigContent, 'utf-8');
    }
  };
}

export default MarkdownRoutes;
