---
group:
  title: 通用
  order: 0
subtitle: 对话气泡
---

用于聊天的气泡容器。

## 何时使用

常用于封装于其他气泡组件。

:::demo 基础用法
basic
:::

:::demo 支持位置和头像
avatar-and-placement
:::

:::demo 支持展开与收起
expand-and-collapse
:::

:::demo 工具栏
toolbar
:::

:::demo 加载中
loading
:::

## API

### Props

| 参数       | 说明                                                        | 类型                                                        | 默认值       |
| ---------- | ----------------------------------------------------------- | ----------------------------------------------------------- | ------------ |
| toolbar    | 启用工具，可传入布尔值或指定工具名称的数组，可选参数        | `boolean` 或 `('copy' \| 'reset' \| 'like' \| 'dislike')[]` | `false`      |
| feedback   | 赞 / 踩的值，可选参数                                       | `number`                                                    | 无           |
| placement  | 信息位置，可选参数                                          | `'start'` 或 `'end'`                                        | `'start'`    |
| avatar     | 头像信息，可传入 `BubbleAvatarProps` 对象或布尔值，可选参数 | `BubbleAvatarProps` 或 `boolean`                            | `false`      |
| loading    | 加载状态，可选参数                                          | `boolean`                                                   | `false`      |
| isCollapse | 是否展示，可选参数                                          | `boolean`                                                   | `false`      |
| status     | 当前流式数据状态，用于可以折叠判断，可选参数                | `'wait'` 或 `'output'` 或 `'complete'`                      | `'complete'` |

### `BubbleAvatarProps` 接口

| 参数  | 说明                       | 类型     | 默认值 |
| ----- | -------------------------- | -------- | ------ |
| src   | 头像的图片源地址，可选参数 | `string` | 无     |
| title | 头像的标题，可选参数       | `string` | 无     |
