<template>
  <div :class="[name, bem([placement])]">
    <div :class="bem('content')">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '../utils';
import { BubbleProps } from './interface';

withDefaults(defineProps<BubbleProps>(), { placement: 'start' });

const [name, bem] = createNamespace('bubble');
</script>

<style lang="less">
.m-bubble {
  display: flex;
  margin: 6px 12px;
}

.m-bubble--start {
  .m-bubble__content {
    border-radius: 2px 12px 12px 12px;
  }
}

.m-bubble--end {
  flex-direction: row-reverse;
  justify-content: end;

  .m-bubble__content {
    border-radius: 12px 2px 12px 12px;
  }
}

.m-bubble__content {
  background: #fff;
}
</style>
