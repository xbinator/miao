<template>
  <MLayout allow-speech placeholder="询问任何问题" class="page-layout" @send="handleMessageSend" @actions="handleActions">
    <MBubbleText :content="'234324'" />
  </MLayout>
</template>

<script setup lang="ts">
import type { LayoutActionOptions } from '@miao/engine';
import { Layout as MLayout, BubbleText as MBubbleText } from '@miao/engine';

function handleMessageSend(a) {
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
