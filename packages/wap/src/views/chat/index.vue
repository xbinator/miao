<template>
  <MLayout allow-speech class="page-layout" @send="handleMessageSend" @actions="handleActions">
    <MBubbleText :content="'234324'" />
  </MLayout>
</template>

<script setup lang="ts">
import type { LayoutActionOptions, SenderResult } from '@miao/engine';
import { Layout as MLayout, BubbleText as MBubbleText } from '@miao/engine';

function handleMessageSend(a: SenderResult) {
  console.log(a);
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
