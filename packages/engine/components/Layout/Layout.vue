<template>
  <div :class="name">
    <PullRefresh ref="PullRefreshRef" v-model:value="isRefresh" :disabled="!allowRefresh" :class="bem('main')" @refresh="handleLoadData">
      <div ref="containerRef" :class="bem('container')">
        <slot></slot>
      </div>
    </PullRefresh>
    <!-- 回到底部 -->
    <ToBottomButton :visible="isBackBottom" @click="setScrollBottom" />

    <div :class="bem('footer')">
      <slot name="footer">
        <SkillList v-if="skills?.length" :items="skills" :class="bem('skill-list')" />

        <Sender
          v-model:value="text"
          :placeholder="placeholder"
          :loading="loading"
          :allow-speech="allowSpeech"
          @send="handleMessageSend"
          @cancel="handleMessageCancel"
          @actions="handleActions"
        />

        <div v-if="deepThink || netSearch" :class="bem('tools')">
          <AttachmentTool v-if="deepThink" v-model:value="activated" text="深度思考" icon="&#xe641;" :false-value="null" :true-value="'R1'" />

          <AttachmentTool v-if="netSearch" v-model:value="activated" text="联网搜索" icon="&#xe634;" :false-value="null" :true-value="'R2'" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LayoutProps, LayoutActionOptions } from './interface';
import type { SenderSendEvent } from '../Sender/interface';
import { ref, nextTick } from 'vue';
import { useEventListener } from '@vueuse/core';
import { createNamespace } from '../utils';
import { Sender } from '../Sender';
import { SkillList } from '../Skill';
import { AttachmentTool } from '../Attachment';
import { PullRefresh } from '../PullRefresh';
import useDisableOverscroll from './hooks/useDisableOverscroll';
import ToBottomButton from './components/ToBottomButton.vue';

const props = withDefaults(defineProps<LayoutProps>(), {
  loading: false,
  finished: false,
  deepThink: false,
  netSearch: false,
  allowRefresh: false,
  allowSpeech: false
});

const emit = defineEmits<{
  (e: 'load'): void;
  (e: 'send', result: SenderSendEvent): void;
  (e: 'cancel'): void;
  (e: 'actions', options: LayoutActionOptions): void;
}>();

const text = defineModel<string>('value', { default: '' });

const isRefresh = defineModel<boolean>('isRefresh', { default: false });

const PullRefreshRef = ref<InstanceType<typeof PullRefresh>>();

const containerRef = ref<HTMLElement>();

const [name, bem] = createNamespace('layout');

useDisableOverscroll();

const activated = ref('');

const isBackBottom = ref(false);
const BACK_BOTTOM_HEIGHT = 300;
const SCROLL_TOP_HEIGHT = 100;

function setScrollBottom(options?: { value?: number; behavior?: 'smooth' | 'auto' }) {
  const el = PullRefreshRef.value?.$el;

  if (!el) return;

  const _options = { top: 0, behavior: options?.behavior };

  nextTick(() => el.scrollTo(_options));
}

function handleLoadData() {
  if (props.finished) return;

  emit('load');
}

function handleMessageSend(result: SenderSendEvent) {
  emit('send', result);
}

function handleMessageCancel() {
  emit('cancel');
}

function handleActions(options: LayoutActionOptions) {
  emit('actions', options);
}

function handleEventScroll() {
  const el = PullRefreshRef.value?.$el;

  if (!el) return;

  // 回到底部
  isBackBottom.value = Math.abs(el.scrollTop) > BACK_BOTTOM_HEIGHT;
  // 加载数据
  if (el.scrollTop < SCROLL_TOP_HEIGHT && props.allowRefresh) {
    handleLoadData();
  }
}

useEventListener(() => PullRefreshRef.value?.$el, 'scroll', handleEventScroll);

defineExpose({ setScrollBottom });
</script>

<style lang="less">
.m-layout {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
}

.m-layout__main {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: block;
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    display: block;
    background: rgb(63 63 63 / 20%);
    border-radius: 2px;
  }
}

.m-layout__container {
  flex: 1;
  height: 0;
}

.m-layout__footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 9px;
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
  overflow: hidden;
  overscroll-behavior: none;
}
</style>
