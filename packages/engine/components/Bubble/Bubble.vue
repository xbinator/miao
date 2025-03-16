<template>
  <div :class="bem([placement])">
    <Avatar v-if="avatar" v-bind="isObject(avatar) ? avatar : {}" :class="bem('avatar')" />

    <div :class="bem('main')">
      <slot name="header"></slot>

      <div v-if="loading" :class="bem('content')">
        <Loading />
      </div>

      <template v-else>
        <div :class="bem('content')">
          <slot></slot>
        </div>

        <Toolbar v-if="!isTyping" :toolbar="toolbar" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isObject } from 'lodash-es';
import { createNamespace } from '../utils';
import { BubbleProps } from './interface';
import Avatar from './Avatar.vue';
import Loading from './components/Loading.vue';
import Toolbar from './Toolbar.vue';

withDefaults(defineProps<BubbleProps>(), { placement: 'start', avatar: undefined });

const [, bem] = createNamespace('bubble');
</script>

<style lang="less">
.m-bubble {
  display: flex;
  flex-direction: column;
  margin: 0 12px 6px;
}

.m-bubble--start {
  .m-bubble__content {
    border-radius: 2px 12px 12px 12px;
    background: #fff;
  }
}

.m-bubble--end {
  flex-direction: row-reverse;
  justify-content: end;

  .m-bubble__content {
    border-radius: 12px 2px 12px 12px;
    color: #fff;
    background: rgb(var(--miao-primary-color-value));
  }
}

.m-bubble__main {
  display: flex;
  flex-direction: column;
}

.m-bubble__content {
  width: fit-content;
}

.m-bubble__avatar {
  margin-bottom: 8px;
}
</style>
