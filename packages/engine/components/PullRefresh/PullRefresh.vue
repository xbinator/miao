<template>
  <div ref="root">
    <div
      ref="track"
      :class="bem('track')"
      :style="{
        paddingBottom: `${state.distance}px`,
        transitionDuration: `${state.duration}ms`,
        transform: state.distance ? `translate3d(0,${state.distance}px, 0)` : ''
      }"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <div v-if="!disabled" :class="[bem('head', state.state)]">
        <template v-if="['normal', 'pulling'].includes(state.state)">下拉查看历史消息</template>
        <template v-else-if="state.state === 'loading'">加载中...</template>
        <template v-else-if="state.state === 'loosing'">释放即可刷新...</template>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, nextTick } from 'vue';
import { useEventListener } from '@vueuse/core';
import { createNamespace } from '../utils';
import { PullRefreshProps } from './interface';
import useTouch from './hooks/useTouch';
import { useScrollParent, getScrollTop } from './hooks/useScrollParent';

const [, bem] = createNamespace('pull-refresh');

type PullRefreshState = 'normal' | 'loading' | 'loosing' | 'pulling';

const props = withDefaults(defineProps<PullRefreshProps>(), { headHeight: 50, successDuration: 500, animationDuration: 300 });
// 是否处于加载中状态
const mode = defineModel<boolean>('value', { default: false });

const emit = defineEmits(['change', 'refresh']);

let reachTop: boolean;

const root = ref<HTMLElement>();
const track = ref<HTMLElement>();
const scrollParent = useScrollParent(root);

const state = reactive({
  state: 'normal' as PullRefreshState,
  distance: 0,
  duration: 0
});

const touch = useTouch();

const isTouchable = () => state.state !== 'loading' && !props.disabled;

function ease(distance: number) {
  let _distance = distance;

  const pullDistance = +(props.pullDistance || props.headHeight);

  if (_distance > pullDistance) {
    if (_distance < pullDistance * 2) {
      _distance = pullDistance + (_distance - pullDistance) / 2;
    } else {
      _distance = pullDistance * 1.5 + (_distance - pullDistance * 2) / 4;
    }
  }

  return Math.round(_distance);
}

function setState(distance: number, isLoading?: boolean) {
  const pullDistance = +(props.pullDistance || props.headHeight);
  state.distance = distance;

  if (isLoading) {
    state.state = 'loading';
  } else if (distance === 0) {
    state.state = 'normal';
  } else if (distance < pullDistance) {
    state.state = 'pulling';
  } else {
    state.state = 'loosing';
  }

  emit('change', { state: state.state, distance });
}

function checkPosition(event: TouchEvent) {
  if (!scrollParent.value) return;

  const { scrollHeight, clientHeight } = scrollParent.value as HTMLElement;

  reachTop = getScrollTop(scrollParent.value) === scrollHeight - clientHeight;

  if (reachTop) {
    state.duration = 0;

    touch.start(event);
  }
}

function onTouchStart(event: TouchEvent) {
  if (!isTouchable()) return;

  checkPosition(event);
}

function onTouchMove(event: TouchEvent) {
  if (!isTouchable()) return;

  if (!reachTop) {
    checkPosition(event);
  }

  const { deltaY } = touch;

  touch.move(event);

  if (reachTop && deltaY.value >= 0 && touch.isVertical()) {
    event.preventDefault();

    setState(ease(deltaY.value));
  }
}

function onTouchEnd() {
  if (reachTop && touch.deltaY.value && isTouchable()) {
    state.duration = +props.animationDuration;

    if (state.state === 'loosing') {
      setState(+props.headHeight, true);

      mode.value = true;

      nextTick(() => emit('refresh'));
    } else {
      setState(0);
    }
  }
}

watch(
  () => mode.value,
  (value) => {
    state.duration = +props.animationDuration;

    if (value) {
      setState(+props.headHeight, true);
    } else {
      setState(0, false);
    }
  }
);

useEventListener(track, 'touchmove', onTouchMove);
</script>

<style lang="less">
.m-pull-refresh__track {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  transition-property: transform;
}

.m-pull-refresh__head {
  width: 100%;
  height: 50px;
  font-size: 12px;
  line-height: 50px;
  color: #666;
  text-align: center;

  &.m-pull-refresh__head--loading {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    transform: translateY(-100%);
  }
}
</style>
