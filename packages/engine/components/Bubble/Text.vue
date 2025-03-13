<template>
  <Bubble :placement="placement">
    <div :class="[name]">{{ typedContent }}</div>
  </Bubble>
</template>

<script lang="ts" setup>
import type { BubbleTextProps } from './interface';
import { computed } from 'vue';
import { createNamespace } from '../utils';
import useTyping from './hooks/useTyping';
import Bubble from './Bubble.vue';

const props = withDefaults(defineProps<BubbleTextProps>(), { typing: false, content: '' });

const _content = computed(() => props.content);

const [typedContent] = useTyping(() => props.typing, _content);

const [name] = createNamespace('bubble-text');
</script>

<style lang="less">
.m-bubble-text {
  padding: 10px 12px;
  font-size: 16px;
  line-height: 26px;
  color: #333;
}
</style>
