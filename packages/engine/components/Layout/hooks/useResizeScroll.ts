import { computed, MaybeRefOrGetter, toValue, watch, Ref, nextTick } from 'vue';
import { useResizeObserver, UseResizeObserverReturn } from '@vueuse/core';

function useResizeScroll(loading: MaybeRefOrGetter<boolean>, el: Ref<HTMLElement | undefined>, cb: () => void) {
  let instance: UseResizeObserverReturn;

  const _loading = computed(() => toValue(loading));

  function initResizeObserver() {
    console.log('initResizeObserver');

    instance?.stop();

    instance = useResizeObserver(el, () => cb());
  }

  watch(
    () => _loading.value,
    (value) => (value ? nextTick(initResizeObserver) : instance?.stop()),
    { immediate: true }
  );
}

export default useResizeScroll;
