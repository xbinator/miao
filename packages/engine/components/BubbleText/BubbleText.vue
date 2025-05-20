<template>
  <Bubble :placement="placement" :avatar="avatar" :loading="loading" :state="_state" :toolbar="toolbar" :is-collapse="isCollapse" @actions="handleBubbleAction">
    <template #avatar>
      <slot name="avatar"></slot>
    </template>

    <div :class="[name]">
      <!-- 深度思考 -->
      <div v-if="think" :class="bem('think-wrapper')">
        <div :class="bem('think-title')">
          <div>深度思考</div>
          <Icon type="&#xe69b;" :class="bem('think-collapse')" :rotate="collapse.think ? 180 : 0" @click="handleThinkCollapse" />
        </div>
        <div v-show="!collapse.think" :class="bem('think')">{{ typedThink }}</div>
      </div>

      <!-- 回答 -->
      <MessageRender :content="typedContent" :mode="placement === 'left' ? 'markdown' : 'text'" />
    </div>
  </Bubble>
</template>

<script lang="ts" setup>
import type { BubbleTextProps, BubbleTextActionOptions } from './interface';
import { computed, reactive, watch } from 'vue';
import { createNamespace } from '../utils';
import { Bubble } from '../Bubble';
import { Icon } from '../Icon';
import useTyping from './hooks/useTyping';
import MessageRender from './components/MessageRender.vue';

const props = withDefaults(defineProps<BubbleTextProps>(), { typing: false, content: '', think: '', isCollapse: true });

const emit = defineEmits<{ (e: 'actions', options: BubbleTextActionOptions): void }>();

const _content = computed(() => props.content);

const _think = computed(() => props.think);

const [typedContent, isContentTyping] = useTyping(() => props.typing, _content);

const [typedThink, isThinkTyping] = useTyping(() => props.typing, _think);

const isTyping = computed(() => isContentTyping.value || isThinkTyping.value);
// eslint-disable-next-line no-nested-ternary
const _state = computed(() => (props.state !== 'complete' ? props.state : isTyping.value ? 'output' : 'complete'));

const [name, bem] = createNamespace('bubble-text');

const collapse = reactive({ think: false });

function handleThinkCollapse() {
  collapse.think = !collapse.think;
}

function handleBubbleAction(options) {
  emit('actions', options);
}

watch(
  () => [isTyping.value, props.loading],
  () => isTyping.value && props.loading && emit('actions', { name: 'typing-complete' }),
  { immediate: true }
);
</script>

<style lang="less">
.m-bubble-text {
  margin: 10px 12px;
  font-size: 14px;
  line-height: 26px;
}

.m-bubble-text__think-title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  line-height: 26px;
  color: #666;
}

.m-bubble-text__think-collapse {
  padding: 0 10px 0 5px;
  font-size: 12px;
  line-height: 1;
}

.m-bubble-text__think {
  position: relative;
  padding-left: 14px;
  margin: 10px 0;
  font-size: 12px;
  color: #666;

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    content: '';
    background: #eee;
    border-radius: 1px;
  }
}
</style>
