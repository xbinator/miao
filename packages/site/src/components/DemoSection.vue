<template>
  <div :class="$style.demoSection">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" module>
.demoSection {
  margin: 20px 0;
}
</style>
