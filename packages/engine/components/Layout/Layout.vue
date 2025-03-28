<template>
  <div :class="name">
    <PullRefresh ref="PullRefreshRef" v-model:value="isRefresh" :disabled="disabled.refresh" :class="bem('main')" @refresh="handleLoadData">
      <div ref="containerRef" :class="bem('container')">
        <slot></slot>
      </div>
    </PullRefresh>
    <!-- 回到底部 -->
    <ToBottomButton :visible="isBackBottom" @click="setScrollBottom" />

    <div :class="bem('footer')">
      <slot name="footer">
        <SkillList v-if="items?.length" :items="items" :class="bem('skill-list')" />

        <Sender :placeholder="placeholder" :loading="loading" @send="handleMessageSend" @cancel="handleMessageCancel" />

        <div v-if="useDeepThink || useNetSearch" :class="bem('tools')">
          <AttachmentTool v-if="useDeepThink" v-model:value="activated" text="深度思考" icon="&#xe641;" :false-value="null" :true-value="'R1'" />

          <AttachmentTool v-if="useNetSearch" v-model:value="activated" text="联网搜索" icon="&#xe634;" :false-value="null" :true-value="'R2'" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LayoutProps } from './interface';
import type { SenderResult } from '../Sender/interface';
import { reactive, ref, nextTick } from 'vue';
import { useEventListener } from '@vueuse/core';
import { createNamespace } from '../utils';
import { Sender } from '../Sender';
import { SkillList } from '../Skill';
import { AttachmentTool } from '../Attachment';
import { PullRefresh } from '../PullRefresh';
import useDisableOverscroll from './hooks/useDisableOverscroll';
import ToBottomButton from './components/ToBottomButton.vue';

const props = withDefaults(defineProps<LayoutProps>(), { useDeepThink: false, useNetSearch: false, loading: false, finished: false });

const emit = defineEmits<{
  (e: 'load'): void;
  (e: 'send', result: SenderResult): void;
  (e: 'cancel'): void;
}>();

const isRefresh = defineModel<boolean>('isRefresh', { default: false });

const PullRefreshRef = ref<InstanceType<typeof PullRefresh>>();

const containerRef = ref<HTMLElement>();

const [name, bem] = createNamespace('layout');

const disabled = reactive({ refresh: false });

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

function handleMessageSend(result: SenderResult) {
  emit('send', result);
}

function handleMessageCancel() {
  emit('cancel');
}

function handleEventScroll() {
  const el = PullRefreshRef.value?.$el;

  if (!el) return;

  // 回到底部
  isBackBottom.value = Math.abs(el.scrollTop) > BACK_BOTTOM_HEIGHT;
  // 加载数据
  if (el.scrollTop < SCROLL_TOP_HEIGHT && !disabled.refresh) {
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
  height: 100vh;
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
    border-radius: 2px;
    background: rgba(63, 63, 63, 0.2);
  }
}

.m-layout__container {
  flex: 1;
  height: 0;
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
