<template>
  <MLayout v-model:value="inputText" :loading="loading" allow-speech class="page-layout" @send="handleSend" @actions="handleActions">
    <template v-for="item in messages" :key="item.messageId">
      <MBubbleText :placement="PLACEMENT[item.userType]" :content="item.text" />
    </template>
  </MLayout>
</template>

<script setup lang="ts">
import type { LayoutActionOptions, SenderResult } from '@miao/engine';
import { ref } from 'vue';
import { useStream } from '@miao/engine';
import { v4 as uuid } from 'uuid';
import { UserType, type Message } from '@/views/chat/type';

const inputText = ref('');

const messages = ref<Message[]>([]);

const PLACEMENT: Record<UserType, 'right' | 'left'> = { [UserType.SENDER]: 'right', [UserType.RECEIVER]: 'left' };

const { stream, loading } = useStream('http://localhost:3000/chat/completion');

function buildNewMessage(result: SenderResult) {
  const messageId = uuid();

  const localMessage: Message = { userType: UserType.RECEIVER, messageId, contentType: result.type };

  if (result.type === 'text') {
    localMessage.text = result.content;
  } else if (result.type === 'recorder') {
    localMessage.file = result.file;
  }

  return { ...localMessage, messageId };
}
function handleSend(result: SenderResult) {
  const messageId = uuid();

  messages.value.push({ userType: UserType.SENDER, text: result.content, messageId, contentType: result.type });

  stream.create({
    data: {},
    onMessage: (message: Message) => {}
  });

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
