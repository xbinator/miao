<template>
  <div :class="$style.layout">
    <div :class="$style.layout__header">
      <div :class="$style.layout__header__title">
        <div>Miao Chat Design</div>
        <div :class="$style.layout__header__title__sub">Make AI Outstanding</div>
      </div>

      <div :class="$style.layout__header__nav">
        <div v-for="item in nav" :key="item.value">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const nav = [
  { label: '文档', value: 'docs' },
  { label: '组件', value: 'components' },
  { label: '演示', value: 'playground' }
];
</script>

<style lang="less" module>
.layout {
  height: 100vh;
  background-color: #fff;
}

.layout__header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 20px;
}

.layout__header__title {
  font-size: 28px;
  font-family: layout-title;
  line-height: 1;
}

.layout__header__title__sub {
  margin-top: 4px;
  font-size: 16px;
}

.layout__header__nav {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 24px;
  border-radius: 24px;
  font-size: 16px;
  color: #666;
  background-color: linear-gradient(117deg, #ffffff1a 17%, #ffffff0d 51%);
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  transform: translate(-50%, -50%);
  backdrop-filter: blur(40px);
  gap: 24px;
}
</style>
