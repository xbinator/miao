<template>
  <span :class="name">
    <i :key="`item-${1}`" :class="bem('dot-item')"></i>
    <i :key="`item-${2}`" :class="bem('dot-item')"></i>
    <i :key="`item-${3}`" :class="bem('dot-item')"></i>
  </span>
</template>

<script setup lang="ts">
import { createNamespace } from '../../utils';

const [name, bem] = createNamespace('bubble-loading');
</script>

<style lang="less">
.m-bubble-loading {
  position: relative;
  column-gap: 8px;
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 46px;
  padding: 10px 20px;
}

.m-bubble-loading__dot-item {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: rgb(var(--miao-primary-color-value));
  animation-name: loadingMove;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
}

@keyframes loadingMove {
  0% {
    transform: translateY(0);
  }

  10% {
    transform: translateY(4px);
  }

  20% {
    transform: translateY(0);
  }

  30% {
    transform: translateY(-4px);
  }

  40% {
    transform: translateY(0);
  }
}
</style>
