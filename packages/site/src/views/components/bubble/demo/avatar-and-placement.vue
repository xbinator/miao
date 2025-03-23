<template>
  <MBubble placement="start" avatar> 哦！你好啊！我是蒙奇·D·路飞！我要成为海贼王的男人！ </MBubble>
  <MBubble placement="start" :avatar="{ src: image, title: '路飞' }"> 嘿嘿！你是谁啊？要不要一起吃肉？ </MBubble>
  <MBubble placement="end" :avatar="{ src: image, title: '路飞' }"> 喂——！！ </MBubble>
  <MBubble placement="end" :avatar="{ src: image }"> 吃吃吃！你就知道吃！钱才是最重要的好吗？ </MBubble>

  <MBubble placement="end">
    <template #avatar>路飞</template>
    海贼王，我当定了！
  </MBubble>
</template>

<script setup lang="ts">
const image = 'https://tibis.top/epi/storage/preview/0f6687e451c53feba029c6aa01faaf52.jpeg';
</script>
