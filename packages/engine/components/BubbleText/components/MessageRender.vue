<template>
  <div :class="name" :data-effect="effect" v-html="renderedContent"></div>
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
  // 雾化效果
  effect?: null | 'typing';
}

const props = withDefaults(defineProps<Props>(), { content: '', isMarkdown: false, effect: null });

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
}

[data-effect='typing'] {
  position: relative;
  overflow: hidden;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol:last-child li,
  ul:last-child li {
    &:last-child::after {
      position: absolute;
      width: 80px;
      height: 1.5em;
      margin-left: -80px;
      content: '';
      background: linear-gradient(90deg, transparent, #fff);
    }
  }
}
</style>
