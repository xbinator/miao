import type { TypingOption, BubbleTextProps } from '../interface';
import { computed, toValue, type MaybeRefOrGetter, Ref, ref, watch, unref, onWatcherCleanup } from 'vue';
import { isString } from 'lodash-es';

function useTyping(typing: MaybeRefOrGetter<BubbleTextProps['typing']>, content: Ref<string>) {
  const typingEnabled = computed(() => !!toValue(typing));

  const baseConfig: Required<TypingOption> = { step: 1, interval: 50 };

  const config = computed(() => {
    const typingRaw = toValue(typing);

    return { ...baseConfig, ...(typeof typingRaw === 'object' ? typingRaw : {}) };
  });

  const typingStep = computed(() => config.value.step);

  const typingInterval = computed(() => config.value.interval);

  const prevContent = ref(content.value);
  const typingIndex = ref(1);

  const isEnabled = computed(() => typingEnabled.value && isString(content.value));

  let Timer: number;

  watch(content, () => {
    const prevContentValue = unref(prevContent);

    prevContent.value = content.value;

    if (!isEnabled.value && isString(content.value)) {
      typingIndex.value = content.value.length;
    } else if (isString(content.value) && isString(prevContentValue) && content.value.indexOf(prevContentValue) !== 0) {
      typingIndex.value = 1;

      clearTimeout(Timer);
    }
  });

  watch(
    [typingIndex, typingEnabled, content],
    () => {
      if (isEnabled.value && isString(content.value) && unref(typingIndex) < content.value.length) {
        Timer = setTimeout(() => (typingIndex.value = unref(typingIndex) + typingStep.value), typingInterval.value);

        onWatcherCleanup(() => clearTimeout(Timer));
      }
    },
    { immediate: true }
  );

  const mergedContent = computed(() => (isEnabled.value ? content.value.slice(0, typingIndex.value) : content.value));

  return [mergedContent, computed(() => isEnabled.value && unref(typingIndex) < content.value.length)];
}

export default useTyping;
