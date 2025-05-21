<template>
  <Bubble :placement="placement" :avatar="avatar" :loading="loading" :state="_state" :toolbar="toolbar" :is-collapse="isCollapse" @actions="handleBubbleAction">
    <template #avatar>
      <slot name="avatar"></slot>
    </template>

    <!-- 深度思考 -->
    <template v-if="think" #top>
      <div :class="bem('think')">
        <div :class="bem('think-toggle')" @click="handleReasonCollapse">
          <div :class="bem('think-title')">深度思考</div>
          <Icon type="&#xe69b;" :class="bem('think-collapse')" :rotate="collapse.think ? 180 : 0" />
        </div>
        <div v-show="!collapse.think" :class="bem('think-content')">
          <MessageRender :content="typedThink" :is-markdown="isMarkdown" />
        </div>
      </div>
    </template>

    <div :class="bem('content')">
      <MessageRender :content="typedContent" :is-markdown="isMarkdown" />
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

const [, bem] = createNamespace('bubble-text');

const collapse = reactive({ think: false });

function handleReasonCollapse() {
  collapse.think = !collapse.think;
}

function handleBubbleAction(options: BubbleTextActionOptions) {
  emit('actions', options);
}

watch(
  () => [isTyping.value, props.loading],
  () => isTyping.value && props.loading && emit('actions', { name: 'typing-complete' }),
  { immediate: true }
);
</script>

<style lang="less">
.m-bubble-text__think {
  margin: 10px 12px 0;
  line-height: 26px;
}

.m-bubble-text__think-toggle {
  display: flex;
  align-items: center;
  width: fit-content;
  height: 30px;
  padding: 0 8px;
  font-size: 12px;
  line-height: 26px;
  cursor: pointer;
  background-color: #f3f6f8;
  border-radius: 4px;
}

.m-bubble-text__think-title {
  margin-right: 5px;
}

.m-bubble-text__think-collapse {
  font-size: 12px;
  line-height: 1;
}

.m-bubble-text__think-content {
  position: relative;
  padding-left: 14px;
  margin-top: 10px;
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

.m-bubble-text__content {
  padding: 10px 12px;
  font-size: 14px;
  line-height: 26px;
}
</style>
