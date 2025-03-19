<template>
  <Bubble toolbar> hello world </Bubble>
  <Bubble :toolbar="['copy']"> hello world </Bubble>
  <Bubble :toolbar="['copy', 'dislike']"> hello world </Bubble>
  <Bubble :toolbar="['like', 'dislike', 'reset']"> hello world </Bubble>
  <Bubble :toolbar="['copy', 'reset', 'like', 'dislike']"> hello world </Bubble>
</template>

<script setup lang="ts">
import { Bubble } from '@miao/engine';
</script>
