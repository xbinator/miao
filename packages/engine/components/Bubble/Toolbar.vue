<template>
  <div v-if="tools.length" :class="name">
    <div :class="bem('left')">
      <button v-for="item in tools" :key="item.key" :class="bem('button')" @click="handleClick(item)">
        <Icon :type="item.icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { isBoolean, values } from 'lodash-es';
import { createNamespace } from '../utils';
import { Icon } from '../Icon';
import { BubbleToolbarProps } from './interface';

const [name, bem] = createNamespace('bubble-toolbar');

const props = withDefaults(defineProps<BubbleToolbarProps>(), { toolbar: false });

const emit = defineEmits(['action']);

const baseTools = {
  // 复制
  copy: {
    key: 'copy',
    icon: '&#xe644;'
  },
  // 重置
  reset: {
    key: 'reset',
    icon: '&#xe646;'
  },
  // 点赞
  like: {
    key: 'like',
    icon: '&#xe6af;'
  },
  // 踩
  dislike: {
    key: 'dislike',
    icon: '&#xe6ae;'
  }
};

const tools = computed(() => {
  if (isBoolean(props.toolbar)) {
    return props.toolbar ? values(baseTools) : [];
  }

  return props.toolbar.map((key) => baseTools[key]);
});

function handleClick(record: { key: string }) {
  emit('action', record.key);
}
</script>

<style lang="less">
.m-bubble-toolbar {
  display: flex;
  margin-top: 6px;
}

.m-bubble-toolbar__left {
  display: flex;
  align-items: center;
  height: 40px;
  gap: 4px;
  padding: 0 6px;
  border-radius: 12px;
  background: #fff;
}

.m-bubble-toolbar__button {
  padding: 6px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
  background-color: transparent;
}
</style>
