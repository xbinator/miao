/* eslint-disable no-use-before-define */
import { ref, onUnmounted, watch, Ref } from 'vue';
import { useVibrate } from '@vueuse/core';
import { getClientRect } from '../../utils';

interface UseTouchOptions {
  // 开始
  onStart?: () => void;
  // 结束
  onEnd?: () => void;
  // 取消
  onCancel?: () => void;

  target?: Ref<HTMLElement | undefined>;
}

export function useTouch({ onStart, onEnd, onCancel, target }: UseTouchOptions) {
  const isCancelled = ref<boolean>(false);

  const isTouching = ref<boolean>(false);

  const { vibrate } = useVibrate({ pattern: 40 });

  const onTouchMove = (event: TouchEvent) => {
    if (!isTouching.value) return;

    const touch = event.touches[0];

    const { top } = getClientRect(target);

    isCancelled.value = touch.clientY < top;
  };

  const onTouchEnd = () => {
    if (!isTouching.value) return;

    isTouching.value = false;

    isCancelled.value ? onCancel?.() : onEnd?.();

    cleanup();
  };

  const onTouchStart = () => {
    isTouching.value = true;

    vibrate?.();
    onStart?.();

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  const cleanup = () => {
    isCancelled.value = false;

    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  };

  watch(
    () => isCancelled.value,
    () => isTouching.value && vibrate?.()
  );

  onUnmounted(cleanup);

  return { onTouchStart, cleanup, isCancelled, isTouching };
}
