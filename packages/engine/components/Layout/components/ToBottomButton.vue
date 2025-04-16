<template>
  <div :class="bem('wrapper')">
    <div :class="bem({ hidden: visible })" @click="handleClick">
      <Icon type="&#xe69b;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '../../utils';
import { Icon } from '../../Icon';

const [, bem] = createNamespace('bottom-button');

interface Props {
  visible: boolean;
}

withDefaults(defineProps<Props>(), { visible: false });

const emit = defineEmits(['click']);

function handleClick() {
  emit('click', { behavior: 'smooth' });
}
</script>

<style lang="less">
.m-bottom-button__wrapper {
  position: relative;
}

.m-bottom-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  font-size: 18px;
  color: rgb(var(--miao-primary-color-value));
  pointer-events: none;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 2%), 0 6px 10px 0 rgb(47 53 64 / 10%);
  opacity: 0;
  transform: translateX(-50%);
  transition: opacity 0.1s ease;

  &.m-bottom-button--hidden {
    pointer-events: auto;
    opacity: 1;
  }
}
</style>
