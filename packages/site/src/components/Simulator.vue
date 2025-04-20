<template>
  <div :class="$style.simulator">
    <div :class="$style.simulator__header">
      {{ currentMenuItem?.title }}
    </div>

    <iframe :src="src" :class="$style.simulator__iframe"></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMenu } from '@/hooks/useMenu';

const { currentMenuItem } = useMenu();

const src = computed(() => `/demo/${currentMenuItem?.value?.name}`);
</script>

<style lang="less" module>
.simulator {
  position: sticky;
  top: 0;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 375px;
  max-height: 700px;
  overflow: hidden;
  background: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 12px;
}

.simulator__header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 18px;
  background: #fff;
}

.simulator__iframe {
  display: block;
  flex: 1;
  border: 0;
}
</style>
