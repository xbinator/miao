<template>
  <div :class="name" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { escape } from 'lodash-es';
import { createNamespace, Markdown } from '../../utils';

interface Props {
  // 是否将 content 内容作为 Markdown 格式处理
  isMarkdown?: boolean;
  // 文本内容
  content: string;
}

const props = withDefaults(defineProps<Props>(), { content: '', isMarkdown: false });

const [name] = createNamespace('message-render');

const renderedContent = computed(() => {
  if (props.isMarkdown) {
    return Markdown(props.content);
  }

  return escape(props.content);
});
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

  hr {
    height: 1px;
    background-color: #ececec;
    border: none;
  }
}
</style>
