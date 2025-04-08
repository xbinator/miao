---
group:
  title: 布局
  order: 1
subtitle: 布局
---

协助进行页面级整体布局。

## 何时使用

用于移动端整体页面布局

## 代码演示

### 基础

:::demo 基础用法
basic
:::

## API

### Props

| 参数         | 说明                 | 类型         | 默认值    |
| ------------ | -------------------- | ------------ | --------- |
| placeholder  | 输入框占位符文本     | string       | '' |
| loading      | 发送消息时的加载状态 | boolean      | false     |
| finished     | 数据加载完成状态     | boolean      | false     |
| value        | 输入框中的内容       | string       | '' |
| skills        | 技能列表             | SkillProps[] | []        |
| useDeepThink | 是否使用深度思考功能 | boolean      | false     |
| useNetSearch | 是否使用联网搜索功能 | boolean      | false     |

### 事件

| 事件   | 说明     | 回调参数                                                                              |
| ------ | -------- | ------------------------------------------------------------------------------------- |
| load   | 滚动下拉加载事件 | () => void                                                                            |
| send   | 发送事件 | ({ value: string; mode: 'text' }) => void \| ({ value: Blob; mode: 'audio' }) => void |
| cancel | 取消事件 | () => void                                                                            |

`SenderResult` 事件请参考 [sender](./sender)
