<template>
  <div :class="name">
    <div :class="bem('main')">
      <textarea
        v-if="isTextInput"
        ref="textarea"
        v-model="input"
        :class="bem('textarea')"
        enterkeyhint="send"
        :placeholder="placeholder"
        :readonly="loading"
        @keydown="handleTextareaEvent"
      ></textarea>

      <SpeechInput v-else @complete="handleSendAudio" @actions="handleSpeechAction" />

      <!-- 录音 -->
      <div v-if="isSupported && allowSpeech && !input" :class="bem('speech-button')" @click="toggleSpeechInput">
        <Icon :type="isTextInput ? '&#xe73b;' : '&#xe700;'" />
      </div>
    </div>

    <button v-if="loading" :class="bem('loading-button')" @click="handleCancel">
      <LoadingButton />
    </button>

    <button v-else-if="input" :class="bem('send-button')" @click="handleSend">
      <Icon type="&#xe643;" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SenderProps, SenderActionOptions, SenderSpeechActionOptions } from './interface';
import { ref } from 'vue';
import { useTextareaAutosize } from '@vueuse/core';
import { createNamespace } from '../utils';
import { Icon } from '../Icon';
import LoadingButton from './components/LoadingButton.vue';
import SpeechInput from './components/SpeechInput.vue';
import { useRecording } from './hooks/useRecording';

const props = withDefaults(defineProps<SenderProps>(), { loading: false, placeholder: '', allowSpeech: false });

const input = defineModel<string>('value', { default: '' });

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'send', result: { value: string; mode: 'text' } | { value: Blob; mode: 'audio' }): void;
  (e: 'actions', options: SenderActionOptions): void;
}>();

const [name, bem] = createNamespace('sender');

const { textarea } = useTextareaAutosize({ input });

const { isSupported } = useRecording();

const isTextInput = ref(true);

function handleSend() {
  if (props.loading || !input.value) return;

  textarea.value?.blur();

  emit('send', { value: input.value, mode: 'text' });
}

function handleSendAudio(audio: Blob) {
  emit('send', { value: audio, mode: 'audio' });
}

function handleTextareaEvent(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 阻止默认换行行为

    handleSend();
  }
}

function toggleSpeechInput() {
  isTextInput.value = !isTextInput.value;
}

function handleCancel() {
  emit('cancel');
}

function handleSpeechAction(options: SenderSpeechActionOptions) {
  emit('actions', options);
}
</script>

<style lang="less">
.m-sender {
  display: flex;
  align-items: flex-end;
  user-select: none;
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
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  min-height: 50px;
  padding: 6px 15px;
  border-radius: 25px;
  font-size: 0;
  background: #fff;
}

.m-sender__send-button,
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

.m-sender__speech-button {
  font-size: 26px;
  line-height: 1;
}
</style>
