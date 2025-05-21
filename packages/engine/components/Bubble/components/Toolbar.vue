<template>
  <div v-if="tools.length" :class="name">
    <div :class="bem('left')">
      <button v-for="item in tools" :key="item.key" :class="bem('button', item.mods)" @click="handleClick(item)">
        <Icon :type="item.icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BubbleToolbarProps, BubbleActionOptions, BubbleToolbar } from '../interface';
import { computed } from 'vue';
import { isBoolean, values } from 'lodash-es';
import { createNamespace, Mods } from '../../utils';
import { Icon } from '../../Icon';
import { Feedback } from '../constant/index';

interface BaseTool {
  key: BubbleToolbar;

  icon: string;

  mods?: Mods;
}

const [name, bem] = createNamespace('bubble-toolbar');

const props = withDefaults(defineProps<BubbleToolbarProps>(), { toolbar: false, feedback: undefined });

const emit = defineEmits<{ (e: 'actions', options: BubbleActionOptions): void }>();

const baseTools = computed(() => {
  // 复制
  const copy: BaseTool = { key: 'copy', icon: '&#xe644;' };

  // 重置
  const reset: BaseTool = { key: 'reset', icon: '&#xe646;' };

  // 喜欢
  const like: BaseTool = { key: 'like', icon: '&#xe6af;' };

  // 不喜欢
  const dislike: BaseTool = { key: 'dislike', icon: '&#xe6ae;' };

  if (props.feedback === Feedback.like) {
    like.icon = '&#xe6b1;';
    like.mods = ['like'];
  }

  if (props.feedback === Feedback.dislike) {
    dislike.icon = '&#xe6b0;';
    dislike.mods = ['dislike'];
  }

  return { copy, reset, like, dislike };
});

const tools = computed(() => {
  if (isBoolean(props.toolbar)) {
    return props.toolbar ? values(baseTools.value) : [];
  }

  return props.toolbar.map((key) => baseTools.value[key]);
});

function handleClick(record: BaseTool) {
  emit('actions', { name: record.key });
}
</script>

<style lang="less">
.m-bubble-toolbar {
  display: flex;
  margin-top: 6px;
}

.m-bubble-toolbar__left {
  display: flex;
  gap: 4px;
  align-items: center;
  height: 40px;
  padding: 0 6px;
  background: #fff;
  border-radius: 12px;
}

.m-bubble-toolbar__button {
  padding: 6px;
  font-size: 18px;
  color: rgb(0 0 0 / 50%);
  background-color: transparent;

  &.m-bubble-toolbar__button--like {
    color: #ff8c00;
  }
}
</style>
