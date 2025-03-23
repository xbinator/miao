<template>
  <MSender placeholder="请输入" />
  <MSender v-model:value="value" />
  <MSender value="Force as loading" loading />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('Hello? this is M!');
</script>
