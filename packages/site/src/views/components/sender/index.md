---
group:
  title: 表达
  order: 0
subtitle: 输入框
simulator: true
---

用于聊天的输入框组件

## 何时使用

需要构建一个对话场景下的输入框

## 代码演示

### 基础

基础用法，受控进行状态管理

```html
<MSender placeholder="请输入" />

<MSender v-model:value="value" />

<MSender value="Force as loading" loading />
```

```js
import { ref } from 'vue';

const value = ref('Hello? this is M!');
```

### 语音输入

语音输入，需要用户同意麦克风权限，仅只支持 移动端

```html
<MSender placeholder="请输入" allow-speech />
```

## API

### Props

| 参数        | 说明           | 类型    | 默认值 |
| ----------- | -------------- | ------- | ------ |
| placeholder | 输入框提示文字 | string  | -      |
| value       | 输入框绑定值   | string  | -      |
| loading     | 是否加载中     | boolean | false  |
| allowSpeech | 是否允许语音   | boolean | false  |

### 事件

| 事件    | 说明             | 回调参数                                                                              |
| ------- | ---------------- | ------------------------------------------------------------------------------------- |
| send    | 发送按钮点击事件 | ({ value: string; mode: 'text' }) => void \| ({ value: Blob; mode: 'voice' }) => void |
| actions | 操作回调事件     | (options: SenderActionOptions) => void                                                |

### SenderActionOptions 类型定义

| 参数    | 说明                         | 类型   | 默认值 |
| ------- | ---------------------------- | ------ | ------ |
| name    | 'error'                      | string | -      |
| message | 麦克风无法打开，出现错误提示 | string | -      |
