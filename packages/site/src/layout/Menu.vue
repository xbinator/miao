<template>
  <AMenu class="aside-container" mode="inline" :selected-keys="[activeMenuItem]">
    <template v-for="item in menus" :key="item.title">
      <AMenuItemGroup v-if="(item as MenuGroup).children" :title="item.title">
        <AMenuItem v-for="child in (item as MenuGroup).children" :key="child.path">
          <RouterLink :to="child.path"> {{ child.title }} {{ child.subtitle }}</RouterLink>
        </AMenuItem>
      </AMenuItemGroup>

      <AMenuItem v-else :key="(item as MenuItem).path">
        <RouterLink :to="(item as MenuItem).path"> {{ item.title }} {{ (item as MenuItem).subtitle }} </RouterLink>
      </AMenuItem>
    </template>
  </AMenu>
</template>

<script setup lang="ts">
import type { MenuItem, MenuGroup } from '@/hooks/useMenu';

interface Props {
  menus?: MenuItem[] | MenuGroup[];
  // 当前选中的菜单
  activeMenuItem?: string;
}

withDefaults(defineProps<Props>(), { menus: () => [], activeMenuItem: '' });
</script>

<style lang="less">
.aside-container {
  min-height: 100%;
  padding: 80px 0 48px;

  &.ant-menu-inline {
    .ant-menu-submenu-title h4,
    > .ant-menu-item,
    .ant-menu-item a {
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
    }

    > .ant-menu-item-group > .ant-menu-item-group-title {
      margin-top: 16px;
      margin-bottom: 16px;
      font-size: 13px;

      &::after {
        position: relative;
        top: 12px;
        display: block;
        width: calc(100% - 20px);
        height: 1px;
        background: rgba(5, 5, 5, 0.06);
        content: '';
      }
    }

    > .ant-menu-item,
    > .ant-menu-submenu > .ant-menu-submenu-title,
    > .ant-menu-item-group > .ant-menu-item-group-title,
    > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item,
    &.ant-menu-inline > .ant-menu-item-group > .ant-menu-item-group-list > .ant-menu-item {
      padding-left: 40px !important;

      .ant-row-rtl & {
        padding-right: 40px !important;
        padding-left: 16px !important;
      }

      .ant-menu-title-content {
        display: flex;
        align-items: center;
      }
    }

    // Nest Category > Type > Article
    &.ant-menu-inline {
      .ant-menu-item-group-title {
        padding-left: 60px;

        .ant-row-rtl & {
          padding-right: 60px;
          padding-left: 16px;
        }
      }

      .ant-menu-item-group-list > .ant-menu-item {
        padding-left: 80px !important;

        .ant-row-rtl & {
          padding-right: 80px !important;
          padding-left: 16px !important;
        }
      }
    }

    .ant-menu-item-group:first-child {
      .ant-menu-item-group-title {
        margin-top: 0;
      }
    }
  }

  a[disabled] {
    color: #ccc;
  }

  .menu-item-link-outside {
    position: relative;

    .anticon {
      position: absolute;
      top: 16px;
      right: -10px;
      font-size: 12px;
      color: var(--primary-color);
      opacity: 0;
      transition: all 0.3s;
    }

    &:hover .anticon {
      opacity: 1;
    }
  }
}
</style>
