<template>
  <div :class="$style.layout">
    <div :class="$style.layout__header">
      <div :class="$style.layout__header__left">
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

    <div :class="$style.layout__main">
      <div :class="$style.layout__aside">
        <Menu :menus="dataSource" :active-menu-item="activeMenuItem" />
      </div>

      <div :class="$style.layout__main__container">
        <div :class="$style.layout__main__content">
          <div :class="$style.layout__main__content__title">{{ currentMenuItem?.title }}</div>

          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import Menu from './Menu.vue';
import { useMenu } from '@/hooks/useMenu';

const nav = [
  { label: '文档', value: 'docs' },
  { label: '组件', value: 'components' },
  { label: '演示', value: 'playground' }
];

const { dataSource, activeMenuItem, currentMenuItem } = useMenu();

const activeNav = computed(() => activeMenuItem.value.split('/').at(1));
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
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 20px;
}

.layout__header__left {
  display: flex;
  align-items: center;
}

.layout__header__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin-right: 16px;
  border-radius: 12px;
  font-size: 30px;
  font-family: layout-title;
  line-height: 1;
  color: #fff;
  background-color: #0cbf64;
  user-select: none;
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
  white-space: nowrap;
  background-color: linear-gradient(117deg, #ffffff1a 17%, #ffffff0d 51%);
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  transform: translate(-50%, -50%);
  backdrop-filter: blur(40px);
  gap: 24px;
}

.layout__nav__item {
  color: rgba(0, 0, 0, 0.55);
  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 0.88);
  }

  &.active {
    color: rgba(0, 0, 0, 0.88);
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
  flex: 1;
  width: 0;
  overflow: auto;

  &::-webkit-scrollbar {
    display: block;
    width: 10px;
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 4px;
    background: rgba(63, 63, 63, 0.2);
  }
}

.layout__main__content {
  width: 100%;
  max-width: 1200px;
  padding: 30px 164px 40px 48px;
  margin: 0 auto;

  .layout__main__content__title {
    margin-bottom: 16px;
    font-weight: 500;
    font-size: 30px;
  }

  h1 {
    margin-top: 12px;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 30px;
    line-height: 38px;
    color: #333;
  }

  h2 {
    margin: 48px 0 16px;
    font-size: 24px;
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
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #eaeaea;
    font-size: 13px;

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
    padding: 12px 8px 12px 8px;
    border-bottom: 1px solid #eaeaea;
    text-align: left;
  }

  th {
    font-weight: bold;
    background-color: #fff;
  }

  thead {
    th {
      font-weight: 500;
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
        border-radius: 0 0 10px 0;
      }
    }
  }

  table code {
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 12px;
    font-family: Menlo, Monaco, Consolas, Courier New, monospace;
    background: rgba(0, 0, 0, 0.06);
  }

  code {
    padding: 2px 5px;
    border-radius: 3px;
    background: #eee;
  }

  pre code {
    padding: auto;
    border-radius: 0;
    background: transparent;
  }

  blockquote {
    padding: 3px 10px;
    margin: 20px 0;
    border-left: 4px solid #ccc;
    font-style: italic;
    color: #555;
    background: #f9f9f9;

    p {
      margin: 6px 0;
      line-height: 20px;
    }
  }
}
</style>
