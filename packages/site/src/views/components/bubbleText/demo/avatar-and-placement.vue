<template>
  <BubbleText placement="start" avatar content="哦！你好啊！我是蒙奇·D·路飞！我要成为海贼王的男人！" />
  <BubbleText placement="start" :avatar="{ src: image, title: '路飞' }" content="嘿嘿！你是谁啊？要不要一起吃肉？" />
  <BubbleText placement="end" :avatar="{ src: image }" content="吃吃吃！你就知道吃！钱才是最重要的好吗？" />
  <BubbleText placement="end" :avatar="{ src: image, title: '路飞' }" content="喂——！！" />
</template>

<script setup lang="ts">
import { BubbleText } from '@miao/engine';

const image = 'https://tibis.top/epi/storage/preview/0f6687e451c53feba029c6aa01faaf52.jpeg';
</script>
