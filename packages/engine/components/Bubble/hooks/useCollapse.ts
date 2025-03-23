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
    if (!el.value) return;

    collapse.visible = el.value.scrollHeight > maxHeight;
  };

  watch(
    () => _status.value,
    (value) => value === 'complete' && _isCollapse.value && nextTick(updateShowCollapse),
    { immediate: true }
  );

  return { collapse, toggleCollapse, updateShowCollapse };
}

export default useCollapse;
