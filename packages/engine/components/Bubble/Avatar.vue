<template>
  <div :class="name">
    <img :src="src" :class="bem('image')" />

    <div :class="bem('text')">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '../utils';
import { BubbleAvatarProps } from './interface';

withDefaults(defineProps<BubbleAvatarProps>(), { title: '', src: '' });

const [name, bem] = createNamespace('bubble-avatar');
</script>

<style lang="less">
.m-bubble-avatar {
  display: flex;
  align-items: center;
}

.m-bubble-avatar__image {
  width: 22px;
  height: 22px;
}

.m-bubble-avatar__text {
  margin-left: 10px;
  font-size: 12px;
  color: #666;
}
</style>
