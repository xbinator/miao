<template>
  <div :class="$style.demoBlock">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" module>
.demoBlock {
  margin: 10px;
}
</style>
