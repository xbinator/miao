<template>
  <BubbleText toolbar content="hello world" />
  <BubbleText :toolbar="['copy', 'reset', 'like', 'dislike']" content="hello world" />
</template>

<script setup lang="ts">
import { BubbleText } from '@miao/engine';
</script>
