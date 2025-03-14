<template>
  <div :class="name">
    <Avatar :src="src" :size="size">
      <template #icon><UserOutlined /></template>
    </Avatar>

    <div :class="bem('text')">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import { Avatar } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { createNamespace } from '../utils';
import { BubbleAvatarProps } from './interface';

withDefaults(defineProps<BubbleAvatarProps>(), { title: '', src: '', size: 22 });

const [name, bem] = createNamespace('bubble-avatar');
</script>

<style lang="less">
.m-bubble-avatar {
  display: flex;
  align-items: center;
}

.m-bubble-avatar__text {
  margin-left: 10px;
  font-size: 12px;
  color: #666;
}
</style>
