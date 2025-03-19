import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Markdown from 'vite-plugin-md';
import markdownItAnchor from 'markdown-it-anchor';
import MarkdownTransform from './plugins/markdown-transform';
import MarkdownRoutes from './plugins/markdown-routes';

// https://vite.dev/config/
export default defineConfig({
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
  ]
});
