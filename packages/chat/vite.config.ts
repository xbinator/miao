import type { UserConfig, ConfigEnv } from 'vite';
import { createVitePlugins, resolvePath } from './build';

export default ({ mode, command }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  const vitePath = resolvePath('./', import.meta.url);

  return {
    resolve: {
      alias: {
        '@': vitePath.src
      }
    },

    // 开发服务器选项
    server: {
      // 监听地址
      host: true,
      // 端口号
      port: 3213
    },

    plugins: createVitePlugins(isBuild, mode)
  };
};
