<template>
  <div :class="name">
    <div v-if="icon || $slots.icon" :class="bem('icon')">
      <slot name="icon">{{ icon }} </slot>
    </div>

    <slot>{{ text }}</slot>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '../utils';
import { SkillButtonProps } from './interface';

withDefaults(defineProps<SkillButtonProps>(), { text: '', icon: '' });

const [name, bem] = createNamespace('skill-button');
</script>

<style lang="less">
.m-skill-button {
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  border-radius: 6px;
  background: #fff;
}

.m-skill-button__icon {
  margin-right: 4px;
}
</style>
