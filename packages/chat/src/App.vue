<template>
  <div>
    <MBubbleText :content="content" :typing="true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const content = ref('据了解，部分果汁产品执行 GB/T 31121。');
</script>

<style scoped></style>
