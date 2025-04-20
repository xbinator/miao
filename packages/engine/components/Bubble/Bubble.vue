<template>
  <div :class="bem([placement, { [size]: size !== 'auto' }])">
    <div v-if="avatar" :class="bem('avatar')">
      <slot name="avatar">
        <Avatar v-bind="isObject(avatar) ? avatar : {}" />
      </slot>
    </div>

    <div :class="bem('main')">
      <div v-if="loading && placement === 'start'" :class="bem('container')">
        <Loading type="dot" />
      </div>

      <template v-else>
        <template v-if="placement === 'end'">
          <Loading v-if="loading" type="circle" :class="bem('loading')" />
        </template>
        <!-- 气泡容器 -->
        <div :class="bem('container')">
          <div ref="contentRef" :class="bem('content', { collapse: collapse.value })">
            <slot></slot>
          </div>

          <ButtonCollapse v-if="shouldShowCollapseButton" v-model:visible="collapse.value" />
        </div>
      </template>
    </div>

    <!-- 底部工具栏 -->
    <Toolbar v-if="status === 'complete' && placement === 'start'" :toolbar="toolbar" @actions="handleToolAction" />

    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts" setup>
import type { BubbleProps, BubbleActionOptions } from './interface';
import { computed, ref } from 'vue';
import { isObject } from 'lodash-es';
import { createNamespace } from '../utils';
import Avatar from './Avatar.vue';
import Toolbar from './Toolbar.vue';
import useCollapse from './hooks/useCollapse';
import ButtonCollapse from './components/ButtonCollapse.vue';
import Loading from './components/Loading.vue';

const props = withDefaults(defineProps<BubbleProps>(), { placement: 'start', avatar: undefined, status: 'complete', collapse: false, size: 'auto' });

const emit = defineEmits<{ (e: 'actions', options: BubbleActionOptions): void }>();

const [, bem] = createNamespace('bubble');

const contentRef = ref<HTMLDivElement>();

const { collapse } = useCollapse(contentRef, 200, () => ({ status: props.status, collapse: props.collapse }));

const shouldShowCollapseButton = computed(() => props.placement === 'start' && collapse.visible && props.collapse);

function handleToolAction(options: BubbleActionOptions) {
  emit('actions', options);
}
</script>

<style lang="less">
.m-bubble {
  display: flex;
  flex-direction: column;
  margin: 20px 12px 0;

  &.m-bubble--start + .m-bubble--start,
  &.m-bubble--end + .m-bubble--end {
    margin-top: 6px;
  }
}

.m-bubble--start {
  .m-bubble__container {
    background: #fff;
    border-radius: 2px 12px 12px;
  }
}

.m-bubble--end {
  align-items: flex-end;

  .m-bubble__container {
    color: #fff;
    background: rgb(var(--miao-primary-color-value));
    border-radius: 12px 2px 12px 12px;
  }

  .m-bubble-avatar {
    flex-direction: row-reverse;
  }

  .m-bubble-avatar__text {
    margin-right: 10px;
  }

  .m-bubble__loading {
    margin-right: 10px;
  }
}

.m-bubble--fill {
  .m-bubble__container {
    width: 100%;
  }
}

.m-bubble__main {
  display: flex;
  align-items: center;
}

.m-bubble__container {
  width: fit-content;
  max-width: 100%;
}

.m-bubble__content--collapse {
  height: 200px;
  overflow: hidden;
}

.m-bubble__avatar {
  margin-bottom: 8px;
}

.m-bubble__collapse {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 14px 0;
}

.m-bubble__collapse-button {
  display: flex;
  align-items: center;
  color: inherit;
  background: transparent;
}

.m-bubble__collapse-text {
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
}

.m-bubble__collapse-icon {
  margin-left: 3px;
  font-size: 10px;
  color: #666;
}
</style>
