<template>
  <button :class="name">
    <div v-if="icon || $slots.icon" :class="bem('icon')">
      <slot name="icon">{{ icon }} </slot>
    </div>

    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { createNamespace } from '../utils';
import { SkillProps } from './interface';

withDefaults(defineProps<SkillProps>(), { text: '', icon: '' });

const [name, bem] = createNamespace('skill-button');
</script>

<style lang="less">
.m-skill-button {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  border-radius: 6px;
  color: inherit;
  background: #fff;
}

.m-skill-button__icon {
  margin-right: 4px;
}
</style>
