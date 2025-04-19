import { resolve } from 'path';

/**
 * less 样式全局配置
 */
export function generateModifyVars() {
  return {
    hack: `true; @import "${resolve('src/assets/styles/global.less')}";`
  };
}
