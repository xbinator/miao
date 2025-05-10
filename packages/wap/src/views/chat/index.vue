<template>
  <MLayout v-model:value="inputText" :loading="loading" allow-speech class="page-layout" @send="handleSend" @actions="handleActions">
    <template v-for="item in messages" :key="item.messageId">
      <MBubbleText :placement="item.role === 'assistant' ? 'left' : 'right'" :content="item.content" />
    </template>
  </MLayout>
</template>

<script setup lang="ts">
import type { Message } from '@/services/chat/type';
import type { LayoutActionOptions, SenderResult } from '@miao/engine';
import { ref } from 'vue';
import { uniqueId } from 'lodash-es';
import { useStream } from '@miao/engine';

const inputText = ref('');

const messages = ref<Message[]>([]);

const { start, loading } = useStream('');

function onMessage(message: Message) {
  const index = messages.value.findLastIndex((item) => item.messageId === message.messageId);

  if (index === -1) {
    messages.value.push(message);

    return;
  }

  const exist = messages.value[index];

  messages.value[index] = { ...exist, ...message, content: (exist.content || '') + (message.content || '') };
}

function handleSend(result: SenderResult) {
  const data: Message = { ...result, role: 'user', messageId: uniqueId() };

  messages.value.push(data);

  const output = '';

  start({ data, onMessage: (message: Message) => {

  } });

  inputText.value = '';
}

function handleActions(options: LayoutActionOptions) {
  console.log(options);
}
</script>

<style lang="less">
.page-layout {
  --miao-primary-color-value: 37, 99, 235;
}
</style>
