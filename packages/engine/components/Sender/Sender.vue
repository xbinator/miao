<template>
  <div :class="name">
    <div :class="bem('main')">
      <textarea
        ref="textarea"
        v-model="input"
        :class="bem('textarea')"
        enterkeyhint="send"
        :placeholder="placeholder"
        :readonly="loading"
        @keydown="handleTextareaEvent"
      ></textarea>
    </div>

    <button v-if="input" :class="bem('button')" @click="handleSend">
      <Icon type="&#xe643;" />
    </button>

    <button v-if="loading" :class="bem('loading-button')" @click="handleCancel">
      <LoadingButton />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTextareaAutosize } from '@vueuse/core';
import { createNamespace } from '../utils';
import { Icon } from '../Icon';
import { SenderProps } from './interface';
import LoadingButton from './components/LoadingButton.vue';

const props = withDefaults(defineProps<SenderProps>(), { loading: false, placeholder: '请输入' });

const input = defineModel<string>('value', { default: '' });

const emit = defineEmits(['send', 'cancel']);

const [name, bem] = createNamespace('sender');

const { textarea } = useTextareaAutosize({ input });

function handleSend() {
  if (props.loading || !input.value) return;

  textarea.value?.blur();

  emit('send', input.value);
}

function handleTextareaEvent(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 阻止默认换行行为

    handleSend();
  }
}

function handleCancel() {
  emit('cancel');
}
</script>

<style lang="less">
.m-sender {
  display: flex;
  align-items: flex-end;
}

.m-sender__textarea {
  width: 100%;
  height: 100%;
  max-height: 170px;
  overflow: auto;
  resize: none;
  font-size: 16px;
  line-height: 20px;

  &::-webkit-scrollbar {
    display: block;
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 2px;
    background: rgba(63, 63, 63, 0.2);
  }
}

.m-sender__main {
  display: flex;
  flex: 1;
  align-items: center;
  min-height: 50px;
  padding: 10px 15px;
  border-radius: 25px;
  font-size: 0;
  background: #fff;
}

.m-sender__button,
.m-sender__loading-button {
  width: 38px;
  height: 38px;
  margin-bottom: 6px;
  margin-left: 10px;
  border-radius: 50%;
  font-size: 38px;
  line-height: 1;
  color: rgb(var(--miao-primary-color-value));
  background-color: #fff;
}
</style>
