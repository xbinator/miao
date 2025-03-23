<template>
  <MBubble toolbar> hello world </MBubble>
  <MBubble :toolbar="['copy']"> hello world </MBubble>
  <MBubble :toolbar="['copy', 'dislike']"> hello world </MBubble>
  <MBubble :toolbar="['like', 'dislike', 'reset']"> hello world </MBubble>
  <MBubble :toolbar="['copy', 'reset', 'like', 'dislike']"> hello world </MBubble>
</template>

<script setup lang="ts">
</script>
