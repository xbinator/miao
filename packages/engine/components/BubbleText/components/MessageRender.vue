<template>
  <div :class="name" v-html="text"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import markdownit from 'markdown-it';
import { createNamespace } from '../../utils';

interface Props {
  content: string;
}

const props = withDefaults(defineProps<Props>(), { content: '' });

const [name] = createNamespace('message-render');

const md = markdownit({ html: true, breaks: true });

const text = computed(() => md.render(props.content));
</script>

<style lang="less">
.m-message-render {
  ul,
  ol {
    padding-left: 20px;
    margin: 8px 0;
  }

  ol li {
    list-style: decimal;
  }

  ul li {
    list-style: disc;
  }
}
</style>
