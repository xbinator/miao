<template>
  <MLayout deep-think net-search :skills="skills">
    <MBubbleText placement="left" content="哦！你好啊！我是蒙奇·D·路飞！我要成为海贼王的男人！" />

    <MBubbleText placement="left" content="嘿嘿！你是谁啊？要不要一起吃肉？ " />

    <MBubbleText placement="right" content=" 喂——！！" />

    <MBubbleText placement="right" content="吃吃吃！你就知道吃！钱才是最重要的好吗？ " />
  </MLayout>
</template>

<script setup lang="ts">
const skills = [{ text: '智能体1' }, { text: '智能体2' }, { text: '智能体3' }, { text: '智能体4' }];
</script>
