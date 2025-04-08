import { ref } from 'vue';
import { isString } from 'lodash-es';
import { asyncTo } from '../../utils';

export function useMicrophone() {
  const permission = ref<'granted' | 'denied' | null>(null);
  async function microphonePermission() {
    if (isString(permission.value)) return permission.value;

    const [, result] = await asyncTo(navigator.permissions.query({ name: 'microphone' }));

    permission.value = result ? null : 'denied';

    if (!result) return permission.value;

    // 麦克风权限 已授予 或者 被拒绝
    if (result.state === 'granted' || result.state === 'denied') {
      permission.value = result.state;

      return permission.value;
    }

    const [, stream] = await asyncTo(navigator.mediaDevices.getUserMedia({ audio: true }));

    if (!stream) {
      permission.value = 'denied';

      return permission.value;
    }

    permission.value = 'granted';
    // 释放资源
    stream.getTracks().forEach((track) => track.stop());

    return permission.value;
  }

  return { microphonePermission };
}
