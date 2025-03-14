<template>
  <div :class="[name, bem([placement])]">
    <Avatar v-if="avatar" v-bind="isObject(avatar) ? avatar : {}" :class="bem('avatar')" />

    <div :class="bem('main')">
      <slot name="header"></slot>

      <div :class="bem('content')">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '../utils';
import { BubbleProps } from './interface';
import Avatar from './Avatar.vue';
import { isObject } from 'lodash-es';

withDefaults(defineProps<BubbleProps>(), { placement: 'start', avatar: undefined });

const [name, bem] = createNamespace('bubble');
</script>

<style lang="less">
.m-bubble {
  display: flex;
  flex-direction: column;
  width: fit-content;
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

.m-bubble__main {
  display: flex;
  flex-direction: column;
}

.m-bubble__content {
  background: #fff;
}

.m-bubble__avatar {
  margin-bottom: 8px;
}
</style>
