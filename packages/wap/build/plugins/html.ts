import type { PluginOption, HtmlTagDescriptor } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export function configHtmlPlugin(_mode: string, isBuild: boolean) {
  const tags: HtmlTagDescriptor[] = [];

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    // 是否压缩 html
    minify: isBuild,
    // 注入 HTML 的数据
    inject: {
      // 注入的数据
      data: {
        // 打包时间
        updateDate: new Date().toString()
      },
      // 需要注入的标签列表
      tags
    }
  });
  return htmlPlugin;
}
