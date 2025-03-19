<template>
  <div class="example">
    <div class="example-title">{{ title }}</div>

    <div class="example-container">
      <div class="example-wrapper">
        <slot></slot>
      </div>

      <div class="example-source-wrapper">
        <div class="example-source" v-html="decoded"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  source: string;
  //
  title: string;
}

const props = withDefaults(defineProps<Props>(), {});

const decoded = computed(() => {
  return decodeURIComponent(props.source);
});
</script>

<style lang="less">
.example-title {
  margin-bottom: 14px;
  font-weight: bold;
  font-size: 16px;
}

.example-container {
  border: 1px solid #eaeaea;
  border-radius: 12px;
}

.example-wrapper {
  padding: 20px;
  border-radius: 12px;
  background-color: #f8f8f8;

  p {
    margin: 0 !important;
  }
}

.example-source-wrapper {
  .shiki {
    padding: 20px;
    margin: 20px 0 0;
    border-radius: 12px;
    overflow: auto;
    background-color: #f9f9f9 !important;

    &::-webkit-scrollbar {
      display: block;
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      display: block;
      border-radius: 2px;
      background: rgba(63, 63, 63, 0.2);
    }
  }
}
</style>
