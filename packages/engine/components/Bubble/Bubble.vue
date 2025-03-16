<template>
  <div :class="bem([placement])">
    <Avatar v-if="avatar" v-bind="isObject(avatar) ? avatar : {}" :class="bem('avatar')" />

    <div :class="bem('main')">
      <slot name="header"></slot>

      <div v-if="loading" :class="bem('container')">
        <Loading />
      </div>

      <template v-else>
        <div :class="bem('container')">
          <div ref="contentRef" :class="bem('content', { collapse: collapse.value })">
            <slot></slot>
          </div>

          <div v-if="placement === 'start' && collapse.visible && isCollapse" :class="bem('collapse', { active: collapse.value })">
            <button :class="bem('collapse-button')" @click="toggleCollapse">
              <div :class="bem('collapse-text')">
                {{ collapse.value ? '展开查看全部' : '收起' }}
              </div>
              <Icon type="&#xe69b;" :class="bem('collapse-icon')" :rotate="collapse.value ? 0 : 180" />
            </button>
          </div>
        </div>
        <!-- 底部工具栏 -->
        <Toolbar v-if="status === 'complete'" :toolbar="toolbar" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { isObject } from 'lodash-es';
import { Icon } from '../Icon';
import { createNamespace } from '../utils';
import { BubbleProps } from './interface';
import Avatar from './Avatar.vue';
import Loading from './components/Loading.vue';
import Toolbar from './Toolbar.vue';
import useCollapse from './hooks/useCollapse';

const props = withDefaults(defineProps<BubbleProps>(), { placement: 'start', avatar: undefined, status: 'complete', isCollapse: false });

const [, bem] = createNamespace('bubble');

const contentRef = ref<HTMLDivElement>();

const { collapse, toggleCollapse } = useCollapse(contentRef, 200, () => props.status);
</script>

<style lang="less">
.m-bubble {
  display: flex;
  flex-direction: column;
  margin: 0 12px 6px;
}

.m-bubble--start {
  .m-bubble__container {
    border-radius: 2px 12px 12px 12px;
    background: #fff;
  }
}

.m-bubble--end {
  flex-direction: row-reverse;
  justify-content: end;

  .m-bubble__container {
    border-radius: 12px 2px 12px 12px;
    color: #fff;
    background: rgb(var(--miao-primary-color-value));
  }
}

.m-bubble__main {
  display: flex;
  flex-direction: column;
}

.m-bubble__container {
  width: fit-content;
}

.m-bubble__content--collapse {
  height: 200px;
  overflow: hidden;
}

.m-bubble__avatar {
  margin-bottom: 8px;
}

.m-bubble__collapse {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;

  &.m-bubble__collapse--active {
    &::before {
      position: absolute;
      top: -14px;
      right: 0;
      left: 0;
      height: 28px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
      transform: translateY(-100%);
      content: '';
    }
  }

  //   width: 351px;
  // height: 28px;
  //
}

.m-bubble__collapse-button {
  display: flex;
  align-items: center;
  color: inherit;
  background: transparent;
}

.m-bubble__collapse-text {
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
}

.m-bubble__collapse-icon {
  margin-left: 3px;
  font-size: 10px;
  color: #666;
}
</style>
