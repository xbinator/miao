---
group:
  title: 通用
  order: 0
subtitle: 对话气泡
---

用于聊天的气泡容器。

## 何时使用

常用于封装于其他气泡组件。

## 代码演示

### 基础

:::demo 基础用法
basic
:::

### 支持位置和头像

:::demo 通过 avatar 设置自定义头像，通过 placement 设置位置，提供了 start、end 两个选项
avatar-and-placement
:::

### 支持展开与收起

:::demo 通过设置 isCollapse 属性，可以展开与收起气泡
expand-and-collapse
:::

### 工具栏

:::demo 通过设置 toolbar 属性，可以添加工具栏
toolbar
:::

### 加载中

:::demo 通过 loading 属性控制加载状态
loading
:::

## API

### Props

| 参数       | 说明                               | 类型                                                    | 默认值   |
| ---------- | ---------------------------------- | ------------------------------------------------------- | -------- |
| toolbar    | 底部工具栏                         | boolean \| ('copy' \| 'reset' \| 'like' \| 'dislike')[] | false    |
| feedback   | 赞 / 踩的值                        | number                                                  | 无       |
| placement  | 信息位置                           | 'start' \| 'end'                                        | 'start'  |
| avatar     | 头像信息                           | BubbleAvatarProps \| boolean \| slot                    | false    |
| loading    | 加载状态                           | boolean                                                 | false    |
| isCollapse | 是否展示                           | boolean                                                 | false    |
| status     | 当前流式数据状态，用于可以折叠判断 | 'wait' \| 'output' \| 'complete'                        | complete |

### BubbleAvatarProps 接口

| 参数  | 说明             | 类型   | 默认值 |
| ----- | ---------------- | ------ | ------ |
| src   | 头像的图片源地址 | string | 无     |
| title | 头像的标题       | string | 无     |

### 事件

| 事件    | 说明         | 回调参数                               |
| ------- | ------------ | -------------------------------------- |
| actions | 操作回调事件 | (options: BubbleActionOptions) => void |

### BubbleActionOptions 接口

| 参数 | 说明                                     | 类型   | 默认值 |
| ---- | ---------------------------------------- | ------ | ------ |
| name | 'copy' \| 'reset' \| 'like' \| 'dislike' | string | -      |
