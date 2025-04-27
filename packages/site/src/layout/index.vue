<template>
  <div ref="containerRef" :class="$style.layout">
    <div :class="$style.layout__header">
      <div :class="$style.layout__header__left" @click="handleTilteClick">
        <div :class="$style.layout__header__logo">M</div>
        <div :class="$style.layout__header__title">
          <div>Miao Chat Design</div>
          <div :class="$style.layout__header__title__sub">Make AI Outstanding</div>
        </div>
      </div>

      <div :class="$style.layout__header__nav">
        <RouterLink
          v-for="item in nav"
          :key="item.value"
          :class="[$style.layout__nav__item, { [$style.active]: item.value === activeNav }]"
          :to="`/${item.value}`"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </div>

    <div :class="$style.layout__sidebar">
      <div @click="visible.menu = !visible.menu">目录</div>
    </div>

    <div :class="$style.layout__main">
      <div :class="$style.layout__aside">
        <Menu :menus="dataSource" :active-menu-item="activeMenuItem" />
      </div>

      <div :class="$style.layout__main__container">
        <div :class="$style.layout__main__content">
          <div :class="$style.layout__main__content__title">{{ currentMenuItem?.title }}</div>
          <RouterView />
        </div>

        <Simulator v-if="currentMenuItem?.simulator" :class="$style.layout__main__simulator" />
      </div>
    </div>

    <ADrawer v-model:open="visible.menu" :closable="false" placement="left" width="80%">
      <Menu :class="$style.layout__drawer__menu" :menus="dataSource" :active-menu-item="activeMenuItem" />
    </ADrawer>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useWindowSize } from '@vueuse/core';
import Menu from './Menu.vue';
import { useMenu } from '@/hooks/useMenu';
import Simulator from '@/components/Simulator.vue';

const router = useRouter();
const { width, height } = useWindowSize();

const nav = [
  { label: '文档', value: 'docs' },
  { label: '组件', value: 'components' },
  { label: '演示', value: 'playground' }
];

const { dataSource, activeMenuItem, currentMenuItem } = useMenu();

const activeNav = computed(() => activeMenuItem.value.split('/').at(1));

const visible = reactive({ menu: false });

function handleTilteClick() {
  router.push('/');
}

function updateNavStyle() {
  console.log('updateNavStyle');
}
</script>

<style lang="less" module>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
}

.layout__header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 20px;
  border-bottom: 1px solid rgb(5 5 5 / 6%);
}

.layout__header__left {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.layout__header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  font-family: layout-title;
  font-size: 30px;
  line-height: 1;
  color: #fff;
  user-select: none;
  background-color: #0cbf64;
  border-radius: 12px;
}

.layout__header__title {
  font-family: layout-title;
  font-size: 28px;
  line-height: 1;
}

.layout__header__title__sub {
  margin-top: 4px;
  font-size: 16px;
}

.layout__header__nav {
  display: flex;
  gap: 24px;
  align-items: center;
  height: 48px;
  padding: 0 24px;
  font-size: 16px;
  border-radius: 24px;
}

.layout__nav__item {
  color: rgb(0 0 0 / 55%);
  cursor: pointer;

  &:hover {
    color: rgb(0 0 0 / 88%);
  }

  &.active {
    color: rgb(0 0 0 / 88%);
  }
}

.layout__main {
  display: flex;
  flex: 1;
  height: 0;
}

.layout__aside {
  width: 25%;
  min-width: 260px;
  max-width: 350px;
  height: 100%;
  background-color: #fff;
}

.layout__main__container {
  display: flex;
  flex: 1;
  justify-content: center;
  width: 0;
  padding: 30px 48px 40px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: block;
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    display: block;
    background: rgb(63 63 63 / 20%);
    border-radius: 4px;
  }
}

.layout__main__content {
  flex: 1;
  width: 0;
  height: fit-content;
  margin-right: 60px;

  .layout__main__content__title {
    margin-bottom: 16px;
    font-size: 30px;
    font-weight: bold;
  }

  h1 {
    margin-top: 12px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
    line-height: 38px;
    color: #333;
  }

  h2 {
    margin: 48px 0 16px;
    font-size: 20px;
    line-height: 32px;
  }

  h3 {
    margin: 16px 0;
    font-size: 18px;
    line-height: 28px;
  }

  p {
    margin: 16px 0;
    line-height: 28px;
  }

  ul,
  ol {
    padding-left: 20px;
    margin: 8px 0;
  }

  ol li {
    list-style: decimal;
  }

  ul li {
    list-style: disc;
  }

  :global(.anchor) {
    color: #00b96b;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  h1,
  h2 {
    &:hover {
      :global(.anchor) {
        opacity: 1;
      }
    }
  }

  table {
    width: 100%;
    font-size: 13px;
    border-collapse: collapse;
    border: 1px solid #eaeaea;

    td:first-of-type {
      width: 18%;
      font-weight: bold;
    }

    td:nth-of-type(4) {
      width: 12%;
    }
  }

  th,
  td {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid #eaeaea;
  }

  th {
    font-weight: bold;
    background-color: #fff;
  }

  thead {
    th {
      font-weight: bold;
      background-color: #f8f8f8;
    }
  }

  tbody {
    td {
      &:nth-of-type(3) {
        color: #c41d7f;
      }
    }

    tr:nth-child(even) {
      background-color: #fff;

      &:first-of-type {
        border-radius: 0 0 0 10px;
      }

      &:last-of-type {
        border-radius: 0 0 10px;
      }
    }
  }

  table code {
    padding: 2px 4px;
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
    font-size: 12px;
    background: rgb(0 0 0 / 6%);
    border-radius: 4px;
  }

  code {
    padding: 2px 5px;
    border-radius: 3px;
  }

  pre code {
    padding: 0;
  }

  pre[class*='language-'] {
    padding: 16px 20px;
    margin: 20px 0;
    background: #f7f8fa;
    border-radius: 20px;

    &::-webkit-scrollbar {
      display: block;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      display: block;
      background: rgb(63 63 63 / 20%);
      border-radius: 4px;
    }
  }

  blockquote {
    padding: 3px 10px;
    margin: 20px 0;
    font-style: italic;
    color: #555;
    background: #f9f9f9;
    border-left: 4px solid #ccc;

    p {
      margin: 6px 0;
      line-height: 20px;
    }
  }
}

.layout__sidebar {
  display: none;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  border-bottom: 1px solid rgb(5 5 5 / 6%);
}

.layout__drawer__menu {
  padding: 0;
  border-inline-end-width: 0 !important;
}

@media (width >= 2080px) {
  .layout__main__content {
    flex: 0 1 auto;
    width: 1200px;
  }
}

@media (width < 1440px) {
  .layout__main__simulator {
    display: none;
  }

  .layout__main__content {
    margin: 0;
  }
}

@media (width < 800px) {
  .layout__sidebar {
    display: flex;
  }

  .layout__header__nav {
    display: none;
  }

  .layout__aside {
    display: none;
  }
}
</style>
