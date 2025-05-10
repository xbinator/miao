import Components from 'unplugin-vue-components/vite';

export const autoRegistryComponents = () => {
  return Components({
    // 用于搜索组件的目录的相对路径
    dirs: ['src/components'],
    // 组件的有效文件扩展名
    extensions: ['vue', 'tsx'],
    // 搜索子目录
    deep: false,
    // 生成“components.d.ts”全局声明，
    dts: 'types/components.d.ts',
    // 允许子目录作为组件的命名空间前缀。
    directoryAsNamespace: true,
    // 忽略命名空间前缀的子目录路径
    globalNamespaces: [],
    // auto import for directives
    directives: true,
    // 解析前转换路径
    importPathTransform: (v) => v,
    // 允许组件替代具有相同名称的其他组件
    allowOverrides: false,
    include: [/\.vue$/, /\.vue\?vue/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      // example of importing Vant
      (componentName) => {
        // where `componentName` is always CapitalCase
        if (componentName.startsWith('M')) return { name: componentName.slice(1), from: '@miao/engine' };
      }
    ]
  });
};
