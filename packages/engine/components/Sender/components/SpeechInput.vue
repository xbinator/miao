<template>
  <div :class="name" @touchstart="onTouchStart">
    <div>按住说话</div>
  </div>

  <div v-if="enabled" ref="containerRef" :class="bem('container', { cancel: isCancelled })">
    <div :class="bem('text')">
      {{ isCancelled ? '松手取消' : '松手发送，上移取消' }}
    </div>

    <div v-for="(height, index) in audioHeights" :key="index" :style="{ height }" :class="bem('bar')"></div>
  </div>
</template>

<script setup lang="ts">
import type { SenderSpeechActionOptions } from '../interface';
import { ref } from 'vue';
import { asyncTo, createNamespace } from '../../utils';
import { useRecording } from '../hooks/useRecording';
import { useMediaRecorder } from '../hooks/useMediaRecorder';
import { useTouch } from '../hooks/useTocuch';

const [name, bem] = createNamespace('speech-input');

const emit = defineEmits<{ (e: 'actions', options: SenderSpeechActionOptions): void; (e: 'complete', audio: Blob): void }>();

const audioHeights = ref<string[]>([]);
const containerRef = ref<HTMLElement>();

function onFrequencyUpdate(v: number[]) {
  const heights: string[] = [];

  for (let i = 0; i < v.length; i++) {
    heights[v.length - 1 - i] = `${v[i]}px`;

    i !== 0 && (heights[v.length + i - 1] = `${v[i]}px`);
  }

  audioHeights.value = heights;
}

const { enabled, stop, start, stream } = useRecording({ onFrequencyUpdate, column: 10 });

const { startRecording, stopRecording, getAudioBlob } = useMediaRecorder(stream);

function stopSpeech() {
  stop();

  stopRecording();
}

async function onStart() {
  await asyncTo(start());

  startRecording();
}

function onEnd() {
  stopSpeech();

  const audioBlob = getAudioBlob();

  if (!audioBlob?.size) return;

  emit('complete', audioBlob);
}

function onCancel() {
  stopSpeech();
}

const { onTouchStart, isCancelled } = useTouch({ onStart, onEnd, onCancel, target: containerRef });
</script>

<style lang="less">
.m-speech-input {
  display: flex;
  flex: 1;
  justify-content: center;
  height: 100%;
  font-size: 16px;
}

.m-speech-input__container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  color: #fff;
  background-color: rgb(var(--miao-primary-color-value));
  inset: 0;
  gap: 2px;
  user-select: none;

  .m-speech-input__bar {
    flex-shrink: 0;
    width: 2px;
    border-radius: 1px;
    background-color: #fff;
  }

  &.m-speech-input__container--cancel {
    background-color: red;
  }

  .m-speech-input__text {
    position: absolute;
    top: -16px;
    left: 50%;
    font-size: 12px;
    color: #666;
    transform: translate(-50%, -50%);
  }
}
</style>
