<template>
  <i :class="name" :style="wrapStyle" v-html="type"></i>
</template>

<script lang="ts" setup>
import type { IconProps } from './interface';
import type { CSSProperties } from 'vue';
import { computed } from 'vue';
import { isNumber } from 'lodash-es';
import { createNamespace } from '../utils';

const props = withDefaults(defineProps<IconProps>(), { type: '', color: '', size: '', rotate: undefined });

const [name] = createNamespace('icon');

const wrapStyle = computed(() => {
  const style: CSSProperties = {};

  if (props.size) {
    style.fontSize = `${props.size}px`;
  }

  if (isNumber(props.rotate)) {
    style.transform = `rotate(${props.rotate}deg)`;
    style.transition = 'all 0.1s cubic-bezier(1, 0.5, 0.8, 1)';
  }

  props.color && (style.color = props.color);

  return style;
});
</script>

<style lang="less">
@font-face {
  font-family: iconfont;
  src: url('./styles/iconfont.woff2') format('woff2');
}

.m-icon {
  font-family: iconfont !important;
}
</style>
