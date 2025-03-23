import type { TypingOption, BubbleTextProps } from '../interface';
import { computed, toValue, type MaybeRefOrGetter, Ref, ref, watch, unref, ComputedRef } from 'vue';
import { isString } from 'lodash-es';

function useTyping(typing: MaybeRefOrGetter<BubbleTextProps['typing']>, content: Ref<string>): [ComputedRef<string>, ComputedRef<boolean>] {
  const typingEnabled = computed(() => !!toValue(typing));

  const baseConfig: Required<TypingOption> = { step: 5, interval: 50 };

  const config = computed(() => {
    const typingRaw = toValue(typing);

    return { ...baseConfig, ...(typeof typingRaw === 'object' ? typingRaw : {}) };
  });

  const typingStep = computed(() => config.value.step);

  const typingInterval = computed(() => config.value.interval);

  const prevContent = ref(content.value);
  const typingIndex = ref(1);

  const isEnabled = computed(() => typingEnabled.value && isString(content.value));

  let Timer: number | null = null;

  function startTypingTimer() {
    typingIndex.value = unref(typingIndex) + typingStep.value;

    Timer = null;
  }

  function closeTypingTimer() {
    Timer && clearTimeout(Timer);

    Timer = null;
  }

  watch(content, () => {
    const prevContentValue = unref(prevContent);

    prevContent.value = content.value;

    if (!isEnabled.value && isString(content.value)) {
      typingIndex.value = content.value.length;
    } else if (isString(content.value) && isString(prevContentValue) && content.value.indexOf(prevContentValue) !== 0) {
      typingIndex.value = 1;

      closeTypingTimer();
    }
  });

  watch(
    [typingIndex, typingEnabled, content],
    () => {
      // 启用打字机功能
      if (isEnabled.value && isString(content.value) && unref(typingIndex) < content.value.length) {
        // 定时打印
        !Timer && (Timer = setTimeout(startTypingTimer, typingInterval.value));
      }
    },
    { immediate: true }
  );

  const mergedContent = computed(() => (isEnabled.value ? content.value.slice(0, typingIndex.value) : content.value));

  const isTyping = computed(() => isEnabled.value && unref(typingIndex) < content.value.length);

  return [mergedContent, isTyping];
}

export default useTyping;
