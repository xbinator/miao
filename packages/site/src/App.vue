<template>
  <ConfigProvider :locale="zhCN" :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

const theme = { token: { colorPrimary: '#00b96b' } };
</script>

<style lang="less"></style>
