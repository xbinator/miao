<template>
  <MLayout ref="layoutRef">
    <MBubbleText :content="content" loading placement="start" />

    <MBubbleText :content="content" placement="start" />

    <MBubbleText :content="content" placement="start" :toolbar="['dislike']" />

    <MBubbleText :content="content" placement="start" :toolbar="true" />

    <MBubbleText :content="content" placement="end" avatar />

    <MBubbleText :content="content" placement="end" />

    <MBubbleText reason-content="江苏出台15条生育推动政策，①女职工生育津贴不用准备材料再" :content="content" placement="start" />

    <MBubbleText :content="md" placement="start" :avatar="{ title: 'Make AI Outstanding' }" is-collapse />

    <MBubbleText :content="code" placement="start" is-collapse typing />

    <MBubbleText content="content" />
  </MLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Layout } from '@miao/engine';

const layoutRef = ref<InstanceType<typeof Layout>>();

const content = ref(
  '江苏台夫妻档主持人苑逸伦和方蕾介绍起最新生育政策：江苏出台15条生育推动政策，①女职工生育津贴不用准备材料再申请，产妇产假结束后能自动到账；②按照南京市最低的社保缴费基数4879元来算，一胎顺产的生育津贴是25696元，还有一次性的营养费3193元，一共是28889元；③江苏失业女性生育可一次领3月失业金。'
);

const md = `### **Miao AI —— Make AI Outstanding（让 AI 更出色）**

Miao AI 组件库的核心理念源自 **Make AI Outstanding**，即让 AI 更智能、更高效、更易用，赋能开发者快速构建卓越的 AI 交互体验。

#### **为什么是 Miao？**
- **M**ake → 让 AI 变得更强大
- **A**I → 专注于人工智能领域
- **O**utstanding → 追求卓越的 AI 体验

Miao AI 组件库不仅提供了基础的聊天 UI 组件，还封装了高效的流式响应、上下文管理、插件扩展等功能，让开发者可以**更轻松地集成 AI，创造更优秀的智能产品**。

#### **Miao AI 如何让 AI 更出色？**
1. **更高效** —— 通过优化流式消息处理和 API 封装，提高 AI 响应速度。
2. **更智能** —— 提供上下文管理、多轮对话支持，让 AI 理解能力更强。
3. **更易用** —— 组件即插即用，减少开发成本，让 AI 集成更便捷。
4. **更可扩展** —— 插件化架构，支持多种 AI 模型，满足不同业务需求。

Miao AI 的目标不仅是成为一个工具库，更是成为 AI 开发者的得力助手，让每个开发者都能轻松打造**出色的 AI 体验**。 🚀`;

const code =
  '以下是一个简单代码示例的 Markdown 文档内容，以 Python 计算两个数之和为例：\n\n# 简单代码示例：计算两个数之和\n\n## 代码功能概述\n此 Python 代码的功能是接收用户输入的两个数字，然后计算它们的和，并将结果输出。\n\n## 代码示例\n```python\n# 获取用户输入的第一个数字\nnum1 = float(input("请输入第一个数字: "))\n\n# 获取用户输入的第二个数字\nnum2 = float(input("请输入第二个数字: "))\n\n# 计算两个数字的和\nsum_result = num1 + num2\n\n# 输出结果\nprint(f"两个数字的和是: {sum_result}")\n```\n\n## 代码使用说明\n1. 运行代码后，程序会提示你输入第一个数字。\n2. 输入第一个数字并按回车键。\n3. 接着程序会提示你输入第二个数字。\n4. 输入第二个数字并按回车键。\n5. 程序将计算这两个数字的和，并输出结果。\n\n## 注意事项\n- 输入的数字必须是有效的数值，否则会引发错误。例如，输入字母会导致程序无法正常工作。\n- 代码运行环境需要支持 Python 3.x 版本。 ';
</script>

<style>
:root {
  --miao-primary-color-value: 37, 99, 235;
}
</style>
