import { computed, nextTick, reactive, Ref, toValue, watch, type MaybeRefOrGetter } from 'vue';
import { BubbleProps, CollapseOptions } from '../interface';

type State = MaybeRefOrGetter<Pick<BubbleProps, 'isCollapse' | 'status'>>;

function useCollapse(el: Ref<HTMLElement | undefined>, state: State, optiosn?: CollapseOptions) {
  const { maxHeight = 200, defaultValue = false } = optiosn || {};

  const collapse = reactive({ value: false, visible: defaultValue });

  const _status = computed(() => toValue(state).status);
  const _isCollapse = computed(() => toValue(state).isCollapse);

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
