<template>
  <ConfigProvider :locale="zhCN">
    <RouterView />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<style lang="less"></style>
