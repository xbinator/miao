<template>
  <div :class="name">
    <div :class="bem('main')">
      <textarea
        v-if="inputType === 'text'"
        ref="textarea"
        v-model="input"
        :class="bem('textarea')"
        enterkeyhint="send"
        :placeholder="placeholder"
        :readonly="loading"
        @keydown="handleTextareaEvent"
      ></textarea>

      <SpeechInput v-else @complete="handleSendVoice" />

      <!-- 录音 -->
      <div v-if="isSupported && allowSpeech && !input" :class="bem('speech-button')" @click="toggleSpeechInput">
        <Icon :type="inputType === 'text' ? '&#xe73b;' : '&#xe700;'" />
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
import type { SenderProps, SenderActionOptions, SenderResult } from './interface';
import { ref } from 'vue';
import { useTextareaAutosize } from '@vueuse/core';
import { createNamespace } from '../utils';
import { Icon } from '../Icon';
import LoadingButton from './components/LoadingButton.vue';
import SpeechInput from './components/SpeechInput.vue';
import { useRecording } from './hooks/useRecording';
import { useMicrophone } from './hooks/useMicrophone';

type InputType = 'text' | 'voice';

const props = withDefaults(defineProps<SenderProps>(), { loading: false, placeholder: '请输入', allowSpeech: false });

const input = defineModel<string>('value', { default: '' });

const emit = defineEmits<{
  (e: 'cancel'): void;
  (e: 'send', result: SenderResult): void;
  (e: 'actions', options: SenderActionOptions): void;
}>();

const [name, bem] = createNamespace('sender');

const { textarea } = useTextareaAutosize({ input });

const { isSupported } = useRecording();

const { microphonePermission } = useMicrophone();

const inputType = ref<InputType>('text');

function handleSend() {
  const value = input.value.trim();

  if (props.loading || !value) return;

  textarea.value?.blur();

  emit('send', { value, mode: 'text' });
}

function handleSendVoice(voice: Blob) {
  emit('send', { value: voice, mode: 'voice' });
}

function handleTextareaEvent(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    event.preventDefault(); // 阻止默认换行行为

    handleSend();
  }
}

async function toggleSpeechInput() {
  // 切换输入方式
  let type: InputType = inputType.value === 'text' ? 'voice' : 'text';
  // 不允许使用麦克风
  if (type === 'voice' && (await microphonePermission()) !== 'granted') {
    type = 'text';

    emit('actions', { name: 'error', message: 'Microphone Permission denied' });
  }

  inputType.value = type;
}

function handleCancel() {
  emit('cancel');
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
  font-size: 16px;
  line-height: 20px;
  resize: none;

  &::-webkit-scrollbar {
    display: block;
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    display: block;
    background: rgb(63 63 63 / 20%);
    border-radius: 2px;
  }
}

.m-sender__main {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  min-height: 50px;
  padding: 6px 15px;
  font-size: 0;
  background: #fff;
  border-radius: 25px;
}

.m-sender__send-button,
.m-sender__loading-button {
  width: 38px;
  height: 38px;
  margin-bottom: 6px;
  margin-left: 10px;
  font-size: 38px;
  line-height: 1;
  color: rgb(var(--miao-primary-color-value));
  background-color: #fff;
  border-radius: 50%;
}

.m-sender__speech-button {
  font-size: 26px;
  line-height: 1;
}
</style>
