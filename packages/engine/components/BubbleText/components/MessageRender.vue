<template>
  <div v-if="mode === 'markdown'" :class="name" v-html="md"></div>
  <div v-else :class="name" v-text="content"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createNamespace, Markdown } from '../../utils';

interface Props {
  // 模式
  mode?: 'markdown' | 'text';
  // 文本内容
  content: string;
}

const props = withDefaults(defineProps<Props>(), { content: '', mode: 'text' });

const [name] = createNamespace('message-render');

const md = computed(() => Markdown(props.content));
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

  p {
    line-height: 24px;
  }

  h1 {
    margin-top: 12px;
    font-size: 24px;
    line-height: 36px;
  }

  h2 {
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 32px;
  }

  .hljs {
    border-radius: 6px;
  }
}
</style>
