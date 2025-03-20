<template>
  <div :class="name" v-html="text"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createNamespace, Markdown } from '../../utils';

interface Props {
  content: string;
}

const props = withDefaults(defineProps<Props>(), { content: '' });

const [name] = createNamespace('message-render');

const text = computed(() => Markdown(props.content));
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
