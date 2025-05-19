<template>
  <Bubble
    :placement="placement"
    :avatar="avatar"
    :loading="loading"
    :status="streamStatus"
    :toolbar="toolbar"
    :is-collapse="isCollapse"
    @actions="handleBubbleAction"
  >
    <template #avatar>
      <slot name="avatar"></slot>
    </template>

    <div :class="[name]">
      <!-- 深度思考 -->
      <div v-if="reasonContent" :class="bem('reason')">
        <div :class="bem('reason-toggle')" @click="handleReasonCollapse">
          <div :class="bem('reason-title')">深度思考</div>
          <Icon type="&#xe69b;" :class="bem('reason-collapse')" :rotate="collapse.reason ? 180 : 0" />
        </div>
        <div v-show="!collapse.reason" :class="bem('reason-content')">
          <MessageRender :effect="effect" :content="typedReasonContent" :is-markdown="isMarkdown" />
        </div>
      </div>
      <!-- 回答 -->
      <MessageRender :effect="effect" :content="typedContent" :is-markdown="isMarkdown" />
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

const props = withDefaults(defineProps<BubbleTextProps>(), { typing: false, content: '', reasonContent: '', isCollapse: true });

const emit = defineEmits<{ (e: 'actions', options: BubbleTextActionOptions): void }>();

const _content = computed(() => props.content);

const _reasonContent = computed(() => props.reasonContent);

const [typedContent, isContentTyping] = useTyping(() => props.typing, _content);

const [typedReasonContent, isReasonContentTyping] = useTyping(() => props.typing, _reasonContent);

const isTyping = computed(() => isContentTyping.value || isReasonContentTyping.value);

const streamStatus = computed(() => (isTyping.value ? 'output' : 'complete'));

const [name, bem] = createNamespace('bubble-text');

const collapse = reactive({ reason: false });

const effect = computed(() => (isTyping.value ? 'typing' : null));

function handleReasonCollapse() {
  collapse.reason = !collapse.reason;
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

.m-bubble-text__reason-toggle {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 8px;
  font-size: 12px;
  line-height: 26px;
  cursor: pointer;
  background-color: #f3f6f8;
  border-radius: 4px;
}

.m-bubble-text__reason-title {
  margin-right: 5px;
}

.m-bubble-text__reason-collapse {
  font-size: 12px;
  line-height: 1;
}

.m-bubble-text__reason-content {
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
