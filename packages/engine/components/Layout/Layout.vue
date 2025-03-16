<template>
  <div :class="name">
    <PullRefresh ref="PullRefreshRef" v-model:value="isRefresh" :class="bem('main')" @refresh="handleRefresh">
      <div ref="containerRef" :class="bem('container')">
        <slot></slot>
      </div>
    </PullRefresh>

    <ToBottomButton :visible="isBackBottom" @click="setScrollBottom" />

    <div :class="bem('footer')">
      <SkillList v-if="items?.length" :items="items" :class="bem('skill-list')" />

      <slot name="footer-before"></slot>

      <Sender :placeholder="placeholder" :loading="loading" @send="handleMessageSend" @cancel="handleMessageCancel" />

      <slot name="footer-after"></slot>

      <div v-if="useDeepThink || useNetSearch" :class="bem('tools')">
        <AttachmentTool v-if="useDeepThink" v-model:value="activated" text="深度思考" icon="&#xe641;" :false-value="null" :true-value="'R1'" />

        <AttachmentTool v-if="useNetSearch" v-model:value="activated" text="联网搜索" icon="&#xe634;" :false-value="null" :true-value="'R2'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import { isBoolean } from 'lodash-es';
import { createNamespace } from '../utils';
import { Sender } from '../Sender';
import { SkillList } from '../Skill';
import { AttachmentTool } from '../Attachment';
import { PullRefresh } from '../PullRefresh';
import useDisableOverscroll from './hooks/useDisableOverscroll';
import useResizeScroll from './hooks/useResizeScroll';
import { LayoutProps } from './interface';
import ToBottomButton from './components/ToBottomButton.vue';

const props = withDefaults(defineProps<LayoutProps>(), { useDeepThink: false, useNetSearch: false, loading: false });

const emit = defineEmits(['refresh', 'message-send', 'message-cancel']);

const isRefresh = defineModel<boolean>('isRefresh', { default: false });

const PullRefreshRef = ref<InstanceType<typeof PullRefresh>>();

const containerRef = ref<HTMLElement>();

const [name, bem] = createNamespace('layout');

useDisableOverscroll();

const activated = ref('');

const isBackBottom = ref(false);
const BACK_BOTTOM_HEIGHT = 300;

function setScrollBottom(options?: { value?: number; behavior?: 'smooth' | 'auto'; delay?: boolean | number }) {
  const el = PullRefreshRef.value?.$el;

  if (!el) return;

  const _options = { top: el.scrollHeight - (options?.value || 0), behavior: options?.behavior };

  if (options?.delay) {
    setTimeout(() => el.scrollTo(_options), isBoolean(options.delay) ? 0 : options.delay);
  } else {
    el.scrollTo(_options);
  }
}

function handleRefresh() {
  emit('refresh');
}

function handleMessageSend() {
  emit('message-send');
}

function handleMessageCancel() {
  emit('message-cancel');
}

function handleEventScroll() {
  const el = PullRefreshRef.value?.$el;

  if (!el) return;

  isBackBottom.value = el.scrollHeight - (el.scrollTop | 0) - el.clientHeight > BACK_BOTTOM_HEIGHT;
}

useEventListener(() => PullRefreshRef.value?.$el, 'scroll', handleEventScroll);

useResizeScroll(props.loading, containerRef, () => setScrollBottom({ behavior: 'smooth' }));

defineExpose({ setScrollBottom });
</script>

<style lang="less">
.m-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.m-layout__main {
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: block;
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 2px;
    background: rgba(63, 63, 63, 0.2);
  }
}

.m-layout__footer {
  gap: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 9px 20px;
}

.m-layout__skill-list {
  width: calc(100% + 18px);
  padding: 0 0 0 9px;
  margin: 0 -9px;

  &::after {
    display: block;
    flex-shrink: 0;
    width: 0;
    content: '';
  }
}

.m-layout__tools {
  display: flex;
  gap: 10px;
}

.m-layout-overscroll-none {
  overscroll-behavior: none;
  overflow: hidden;
}
</style>
