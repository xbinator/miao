import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import { autoRegistryComponents } from './component';
import { configHtmlPlugin } from './html';

export function createVitePlugins(isBuild: boolean, mode: string) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue()
  ];

  vitePlugins.push(configHtmlPlugin(mode, isBuild));

  vitePlugins.push(autoRegistryComponents());

  return vitePlugins;
}
