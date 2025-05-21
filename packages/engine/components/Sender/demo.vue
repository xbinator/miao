<template>
  <DemoSection>
    <DemoBlock>
      <MSender placeholder="询问任何问题" />
    </DemoBlock>

    <DemoBlock>
      <MSender v-model:value="value" />
    </DemoBlock>

    <DemoBlock>
      <MSender value="Force as loading" loading />
    </DemoBlock>

    <DemoBlock>
      <MSender placeholder="请输入" allow-speech />
    </DemoBlock>
  </DemoSection>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('Hello? this is M!');
</script>
