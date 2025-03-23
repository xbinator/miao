import path from 'node:path';
import type { UserConfig, ConfigEnv } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Markdown from 'vite-plugin-md';
import markdownItAnchor from 'markdown-it-anchor';
import MarkdownTransform from './plugins/markdown-transform';
import MarkdownRoutes from './plugins/markdown-routes';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  return defineConfig({
    /**
     * 静态资源存放路径
     */
    base: env.VITE_PUBLIC_PATH,

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },

    server: {
      /**
       * Enable host access
       */
      host: true,
      /**
       * Set the port
       */
      port: 3312
    },

    plugins: [
      vue({ include: [/\.vue$/, /\.md$/] }),
      vueJsx(),
      MarkdownRoutes('views/components'),
      MarkdownTransform(),
      Markdown({
        markdownItSetup: async (md) => {
          md.use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.ariaHidden({
              placement: 'after', // 在标题前显示锚点
              symbol: '#', // 锚点符号
              class: 'anchor' // 自定义 CSS 类
            }),
            slugify: (s) => s.trim().toLowerCase() // 处理中文标题的 URL
          });
        }
      }),
      // @ts-ignore
      Components({
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true })]
      })
    ],

    build: {
      outDir: '../../dist/site', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
      // 生成静态资源的存放路径
      assetsDir: 'static',
      // 设置最终构建的浏览器兼容目标
      target: 'es2015',
      // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target
      cssTarget: 'chrome80',
      // 图片转 base64 编码的阈值
      assetsInlineLimit: 4096,
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 500,
      // 启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
      emptyOutDir: true
    }
  });
};
