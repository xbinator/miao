import { computed, nextTick, reactive, Ref, toValue, watch, type MaybeRefOrGetter } from 'vue';
import { BubbleProps } from '../interface';

function useCollapse(el: Ref<HTMLElement | undefined>, maxHeight: number, status: MaybeRefOrGetter<Pick<BubbleProps, 'isCollapse' | 'status'>>) {
  const collapse = reactive({ value: false, visible: false });

  const _status = computed(() => toValue(status).status);
  const _isCollapse = computed(() => toValue(status).isCollapse);

  const toggleCollapse = () => {
    if (!el.value) return;

    collapse.value = !collapse.value;
  };

  const updateShowCollapse = () => {
    if (!el.value || _status.value !== 'complete' || !_isCollapse.value) return;

    collapse.visible = el.value.scrollHeight > maxHeight;
  };

  const updateElementStyle = () => {
    if (!el.value) return;

    el.value.style.overflow = collapse.value ? 'hidden' : '';
    el.value.style.maxHeight = collapse.value ? `${maxHeight}px` : '';
  };

  watch(
    () => _status.value,
    () => nextTick(updateShowCollapse),
    { immediate: true }
  );

  watch(
    () => collapse.value,
    () => nextTick(updateElementStyle),
    { immediate: true }
  );

  return { collapse, toggleCollapse, updateShowCollapse };
}

export default useCollapse;
