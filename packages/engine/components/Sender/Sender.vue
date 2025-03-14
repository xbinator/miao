<template>
  <div :class="name">
    <textarea ref="textarea" v-model="input" :class="bem('textarea')" placeholder="请输入"></textarea>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '../utils';
import { useTextareaAutosize } from '@vueuse/core';
import { SenderProps } from './interface';

withDefaults(defineProps<SenderProps>(), {});

const [name, bem] = createNamespace('sender');

const { textarea, input } = useTextareaAutosize();
</script>

<style scoped>
.m-sender {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 14px 15px;
  margin: 0 9px;
  border-radius: 25px;
  background: #fff;
  background-color: #fff;
}

.m-sender__textarea {
  width: 100%;
  height: 100%;
  max-height: 170px;
  overflow: auto;
  resize: none;
  font-size: 16px;
  line-height: 20px;
}
</style>
