import { Ref, ref, shallowRef } from 'vue';
import { useSupported } from '@vueuse/core';

interface UseRecordingOptions {
  // 定义回调函数的类型
  onFrequencyUpdate?: (data: number[]) => void;
  //
  column?: number;
}

function generateInterval(size: number): number[] {
  return Array.from({ length: size }, (_, i) => {
    return 10 + 20 * (0.5 + 0.5 * Math.sin(Date.now() / 1000 + i));
  });
}

// 线性插值函数（平滑过渡）
function lerp(a: number, b: number, t: number): number {
  return a * (1 - t) + b * t;
}

export function useRecording({ column = 4, onFrequencyUpdate }: UseRecordingOptions = {}) {
  // 检查当前环境是否支持媒体设备获取用户媒体流
  const isSupported = useSupported(() => navigator?.mediaDevices?.getUserMedia);

  // 使用 shallowRef 存储媒体流，避免不必要的响应式更新
  const stream: Ref<MediaStream | undefined> = shallowRef();

  // 使用 ref 存储录音启用状态
  const enabled = ref(false);

  // 存储音频分析器
  const analyser: Ref<AnalyserNode | undefined> = shallowRef();

  // 存储音频上下文
  const audioContext: Ref<AudioContext | undefined> = shallowRef();

  // 存储频率数据
  const frequencyData: Ref<Uint8Array | undefined> = shallowRef();

  let animationFrameId: number | undefined;
  // 存储上一帧的波形高度
  let previousHeights: number[] = [];

  function updateFrequencyData() {
    if (!analyser.value || !frequencyData.value) return;

    analyser.value.getByteFrequencyData(frequencyData.value);

    let squared = 0;
    const heights: number[] = [];

    const chunk = Math.floor(frequencyData.value.length / column);

    // 让 interval 采用非线性分布，提升均匀度
    const interval = generateInterval(column);

    for (let i = 0; i < column; i++) {
      let sum = 0;

      for (let j = 0; j < chunk; j++) {
        const value = frequencyData.value[i * chunk + j];
        sum += value;
        squared += value * value;
      }

      // 采用指数缩放，使随机波形更自然
      let height = (sum ** 0.8 / (chunk * 255) ** 0.8) * interval[i];
      // 让高度有平滑过渡
      height = lerp(previousHeights[i] || height, height, 0.2);
      // 限制范围，避免过大或过小
      height = Math.max(5, Math.min(height, 30));

      heights.push(height);
    }
    // 更新上一帧的高度数据
    previousHeights = heights;

    // 计算 RMS（均方根）判断整体音量
    const rms = Math.sqrt(squared / frequencyData.value.length);

    // 平滑处理：如果 RMS < 15，逐步衰减高度，避免突兀
    const smoothedHeights = heights.map((h) => (rms < 15 ? lerp(h, 5, 0.1) : h));

    onFrequencyUpdate?.(smoothedHeights);

    animationFrameId = requestAnimationFrame(updateFrequencyData);
  }

  function _stop() {
    stream.value?.getTracks().forEach((t) => t.stop());
    stream.value = undefined;
    // 关闭音频上下文
    audioContext.value?.close();
    audioContext.value = undefined;
    analyser.value = undefined;
    frequencyData.value = undefined;

    animationFrameId && cancelAnimationFrame(animationFrameId);
  }

  function stop() {
    _stop();

    enabled.value = false;
  }

  async function _start() {
    if (!isSupported.value || stream.value) return;

    stream.value = await navigator.mediaDevices.getUserMedia({ audio: true });

    // 创建音频上下文
    audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)();

    // 创建媒体流源
    const source = audioContext.value.createMediaStreamSource(stream.value);

    // 创建音频分析器
    analyser.value = audioContext.value.createAnalyser();
    analyser.value.fftSize = 256;
    const bufferLength = analyser.value.frequencyBinCount;
    frequencyData.value = new Uint8Array(bufferLength);

    // 将源连接到分析器
    source.connect(analyser.value);
    // 更新频率数据
    updateFrequencyData();
  }

  async function start() {
    await _start();

    if (stream.value) enabled.value = true;

    return enabled.value;
  }

  return { isSupported, enabled, stream, stop, start };
}
