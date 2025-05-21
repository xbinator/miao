---
group:
  title: 布局
  order: 1
subtitle: 布局
simulator: true
---

协助进行页面级整体布局。

## 何时使用

用于移动端整体页面布局

## 引入

通过以下方式来全局注册组件

```ts
import { createApp } from 'vue';
import { Layout } from '@miao/engine';

const app = createApp();
app.use(Layout);
```

## 代码演示

### 基础

基础用法

```html
<MLayout deep-think net-search :skills="skills">
  <MBubbleText placement="left" content="哦！你好啊！我是蒙奇·D·路飞！我要成为海贼王的男人！" />

  <MBubbleText placement="left" content="嘿嘿！你是谁啊？要不要一起吃肉？ " />

  <MBubbleText placement="right" content=" 喂——！！" />

  <MBubbleText placement="right" content="吃吃吃！你就知道吃！钱才是最重要的好吗？ " />
</MLayout>
```

```js
const skills = [{ text: '智能体1' }, { text: '智能体2' }, { text: '智能体3' }, { text: '智能体4' }];
```

## API

### Props

| 参数         | 说明                 | 类型         | 默认值   |
| ------------ | -------------------- | ------------ | -------- |
| placeholder  | 输入框占位符文本     | string       | '请输入' |
| loading      | 发送消息时的加载状态 | boolean      | false    |
| finished     | 数据加载完成状态     | boolean      | false    |
| value        | 输入框中的内容       | string       | ''       |
| skills       | 技能列表             | SkillProps[] | []       |
| deepThink    | 是否使用深度思考功能 | boolean      | false    |
| netSearch    | 是否使用联网搜索功能 | boolean      | false    |
| allowRefresh | 是否可以使用下拉加载 | boolean      | false    |

### 事件

| 事件   | 说明             | 回调参数                      |
| ------ | ---------------- | ----------------------------- |
| load   | 滚动下拉加载事件 | () => void                    |
| send   | 发送事件         | (result: SenderSendEvent)=> void |
| cancel | 取消事件         | () => void                    |

### SkillProps 类型定义

| 参数 | 说明     | 类型                   | 默认值    |
| ---- | -------- | ---------------------- | --------- |
| text | 按钮文本 | string                 | -         |
| icon | 按钮图标 | string                 | -         |
| type | 按钮类型 | 'primary' \| 'default' | 'default' |

`SenderSendEvent` 事件请参考 [Sender.send 事件](./sender)
