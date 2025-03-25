<template>
  <div :class="bem({ active: visible })" @click="toggleCollapse">
    <div :class="bem('text')">
      {{ visible ? '展开查看全部' : '收起' }}
    </div>
    <Icon type="&#xe69b;" :class="bem('icon')" :rotate="visible ? 0 : 180" />
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '../../utils';
import { Icon } from '../../Icon';

const [, bem] = createNamespace('button-collapse');

const visible = defineModel<boolean>('visible', { default: false });

function toggleCollapse() {
  visible.value = !visible.value;
}
</script>

<style lang="less">
.m-button-collapse {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  margin: 10px 12px;
  border-radius: 18px;
  font-size: 12px;
  background: #f8f8f8;

  &.m-button-collapse--active {
    &::before {
      position: absolute;
      top: -10px;
      right: 0;
      left: 0;
      height: 28px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
      transform: translateY(-100%);
      content: '';
    }
  }
}

.m-button-collapse__text {
  font-weight: bold;
}

.m-button-collapse__icon {
  margin-left: 2px;
  font-size: 12px;
}
</style>
