<template>
  <div class="example">
    <div class="example-title">{{ title }}</div>

    <div class="example-container">
      <div class="example-wrapper">
        <slot></slot>
      </div>

      <div class="example-button-wrapper">
        <div class="example-button" :class="{ action: visible }" @click="toggleVisible">
          <FunctionOutlined />
        </div>
      </div>

      <div v-if="visible" class="example-source-wrapper">
        <div class="example-source" v-html="decoded"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { FunctionOutlined } from '@ant-design/icons-vue';

interface Props {
  source: string;
  //
  title: string;
}

const props = withDefaults(defineProps<Props>(), {});

const decoded = computed(() => {
  return decodeURIComponent(props.source);
});

const visible = ref(false);

function toggleVisible() {
  visible.value = !visible.value;
}
</script>

<style lang="less">
.example-title {
  margin-bottom: 14px;
  font-size: 14px;
}

.example-container {
  border: 1px solid #eaeaea;
  border-radius: 12px;
}

.example-button-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 10px;
}

.example-button {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;

  &:hover,
  &.action {
    color: #00b96b;
    background-color: fade(#00b96b, 5);
  }
}

.example-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 12px 12px 0 0;
  background-color: #f8f8f8;

  p {
    margin: 0 !important;
  }
}

.example-source-wrapper {
  .shiki {
    padding: 20px;
    margin: 0;
    border-radius: 0 0 12px 12px;
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
