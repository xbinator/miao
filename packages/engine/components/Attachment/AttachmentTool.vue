<template>
  <button :class="bem({ activated })" @click="handleClick">
    <div v-if="icon || $slots.icon" :class="bem('icon')">
      <slot name="icon"> <Icon :type="icon" /> </slot>
    </div>

    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { createNamespace } from '../utils';
import { Icon } from '../Icon';
import { AttachmentToolProps } from './interface';

const props = withDefaults(defineProps<AttachmentToolProps>(), { text: '', icon: '', trueValue: true, falseValue: false });

const mode = defineModel<string | number | null | undefined | boolean>('value', { default: false });

const [, bem] = createNamespace('attachment-tool');

const activated = computed(() => mode.value === props.trueValue);

function handleClick() {
  mode.value = activated.value ? props.falseValue : props.trueValue;
}
</script>

<style lang="less">
.m-attachment-tool {
  display: flex;
  align-items: center;
  width: fit-content;
  height: 24px;
  padding: 0 8px;
  border: 1px solid #fff;
  border-radius: 100px;
  font-size: 12px;
  color: #666;
  background: #fff;
  transition: all 0.3s;

  &.m-attachment-tool--activated {
    border-color: rgb(var(--miao-primary-color-value));
    border-radius: 12px;
    color: rgb(var(--miao-primary-color-value));
    background-color: rgba(var(--miao-primary-color-value), 0.06);
  }
}

.m-attachment-tool__icon {
  margin-right: 1px;
  font-size: 14px;
  line-height: 1;
}
</style>
