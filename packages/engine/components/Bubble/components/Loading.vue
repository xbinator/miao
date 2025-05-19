<template>
  <span v-if="type === 'dot'" :class="bem('dot')">
    <i :key="`item-${1}`" :class="bem('dot-item')"></i>
    <i :key="`item-${2}`" :class="bem('dot-item')"></i>
    <i :key="`item-${3}`" :class="bem('dot-item')"></i>
  </span>

  <span v-else-if="type === 'circle'" :class="bem('spinner')">
    <svg :class="bem('circular')" viewBox="25 25 50 50">
      <circle cx="50" cy="50" r="20" fill="none"></circle>
    </svg>
  </span>
</template>

<script setup lang="ts">
import { createNamespace } from '../../utils';

interface Props {
  type: 'dot' | 'circle';
}

withDefaults(defineProps<Props>(), {});

const [, bem] = createNamespace('bubble-loading');
</script>

<style lang="less">
.m-bubble-loading__dot {
  position: relative;
  display: flex;
  column-gap: 8px;
  align-items: center;
  height: 100%;
  min-height: 46px;
  padding: 10px 20px;
}

.m-bubble-loading__dot-item {
  width: 4px;
  height: 4px;
  background-color: rgb(var(--miao-primary-color-value));
  border-radius: 100%;
  animation-name: miao-loading-move;
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

.m-bubble-loading__spinner {
  position: relative;
  display: inline-block;
  width: 25px;
  max-width: 100%;
  height: 25px;
  max-height: 100%;
  vertical-align: middle;
  color: rgb(var(--miao-primary-color-value));
  animation: miao-rotate 2s linear infinite;
}

.m-bubble-loading__circular {
  display: block;
  width: 100%;
  height: 100%;

  circle {
    stroke: currentColor;
    stroke-width: 3;
    stroke-linecap: round;
    animation: miao-circular 1.5s ease-in-out infinite;
  }
}

@keyframes miao-loading-move {
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

@keyframes miao-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes miao-circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}
</style>
