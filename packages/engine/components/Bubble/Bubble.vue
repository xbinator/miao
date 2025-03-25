<template>
  <div :class="bem([placement, fit])">
    <div :class="bem('avatar')">
      <slot name="avatar">
        <Avatar v-if="avatar" v-bind="isObject(avatar) ? avatar : {}" />
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

const props = withDefaults(defineProps<BubbleProps>(), { placement: 'start', avatar: undefined, status: 'complete', isCollapse: false, fit: 'cover' });

const emit = defineEmits<{ (e: 'actions', options: BubbleActionOptions): void }>();

const [, bem] = createNamespace('bubble');

const contentRef = ref<HTMLDivElement>();

const { collapse } = useCollapse(contentRef, 200, () => ({ status: props.status, isCollapse: props.isCollapse }));

const shouldShowCollapseButton = computed(() => props.placement === 'start' && collapse.visible && props.isCollapse);

function handleToolAction(options: BubbleActionOptions) {
  emit('actions', options);
}
</script>

<style lang="less">
.m-bubble {
  display: flex;
  flex-direction: column;
  margin: 0 12px 6px;
}

.m-bubble--start {
  .m-bubble__container {
    border-radius: 2px 12px 12px 12px;
    background: #fff;
  }
}

.m-bubble--end {
  align-items: flex-end;

  .m-bubble__container {
    border-radius: 12px 2px 12px 12px;
    color: #fff;
    background: rgb(var(--miao-primary-color-value));
  }

  .m-bubble__avatar {
    flex-direction: row-reverse;
  }

  .m-bubble-avatar__text {
    margin-right: 10px;
  }

  .m-bubble__loading {
    margin-right: 10px;
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
  justify-content: center;
  align-items: center;
  margin: 14px 0;
}

.m-bubble__collapse-button {
  display: flex;
  align-items: center;
  color: inherit;
  background: transparent;
}

.m-bubble__collapse-text {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
}

.m-bubble__collapse-icon {
  margin-left: 3px;
  font-size: 10px;
  color: #666;
}
</style>
