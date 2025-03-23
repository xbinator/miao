---
group:
  title: 通用
  order: 1
subtitle: 文本对话气泡
---

用于聊天的文本气泡组件。

## 代码演示

常用于聊天的时候。

## 代码示例

### 基础

:::demo 基础用法
basic
:::

### 打字效果

:::demo 通过设置 typing 属性，开启打字效果。更新 content 和 reasonContent 如果是之前的子集，则会继续输出，否则会重新输出
typing
:::

## API

### Props

| 参数          | 说明                 | 类型                                            | 默认值 |
| ------------- | -------------------- | ----------------------------------------------- | ------ |
| typing        | 设置聊天内容打字动画 | boolean \| { step?: number, interval?: number } | false  |
| content       | 聊天内容             | string                                          | -      |
| reasonContent | 思考内容             | string                                          | -      |

### 事件

| 事件    | 说明         | 回调参数                                   |
| ------- | ------------ | ------------------------------------------ |
| actions | 操作回调事件 | (options: BubbleTextActionOptions) => void |

### BubbleTextActionOptions 接口

> BubbleTextActionOptions 继承于 BubbleActionOptions

| 参数 | 说明                                                                            | 类型   | 默认值 |
| ---- | ------------------------------------------------------------------------------- | ------ | ------ |
| name | typing-complete：打字效果完成时的回调，如果没有设置 typing 将在渲染时立刻触发 | string | -      |

更多属性请参考 [bubble](./bubble)
