import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

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
    vue(),
    vueJsx(),
    // @ts-ignore
    Components({
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
      resolvers: [AntDesignVueResolver({ importStyle: false, resolveIcons: true })]
    })
  ]
});
