import { computed, nextTick, reactive, Ref, toValue, watch, type MaybeRefOrGetter } from 'vue';
import { BubbleProps } from '../interface';

function useCollapse(el: Ref<HTMLElement | undefined>, maxHeight: number, status: MaybeRefOrGetter<BubbleProps['status']>) {
  const collapse = reactive({ value: false, visible: false });

  const _status = computed(() => toValue(status));

  const toggleCollapse = () => {
    if (!el.value) return;

    collapse.value = !collapse.value;
  };

  const updateShowCollapse = () => {
    if (!el.value) return;

    collapse.visible = el.value.scrollHeight > maxHeight;
  };

  watch(
    () => _status.value,
    (value) => value === 'complete' && nextTick(updateShowCollapse),
    { immediate: true }
  );

  return { collapse, toggleCollapse, updateShowCollapse };
}

export default useCollapse;
