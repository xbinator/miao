import { readonly, Ref, ref } from 'vue';
import { getBytes, getLines, getMessages } from './parse';

export type { EventSourceMessage } from './parse';

// 定义流请求的配置参数类型
interface UseStreamRequestOptions<T> {
  // 请求体
  data?: T | null;
  // 每次接收到新数据的回调
  onMessage?: (message: any) => void;
  // 接收完成时的回调
  onFinish?: () => void;
  // 发生错误时的回调
  onError?: (error: Error) => void;
  // 接收到响应时的回调
  onResponse?: (response: Response) => void;
}

interface UseStreamConfig {
  // 请求方法，默认 POST
  method?: 'GET' | 'POST';
  // 请求头
  headers?: HeadersInit;
}

export interface ReadableStreamInstance {
  // 创建流请求
  create: (options: UseStreamRequestOptions<any>) => Promise<void>;
  // 中断流请求
  abort: () => void;
}

export interface UseStreamHelpers {
  // 是否正在加载中
  loading: Readonly<Ref<boolean>>;
  // 流请求方法
  stream: ReadableStreamInstance;
}

export function isSpecialRequestBody(data: any) {
  const toString = (val: unknown): string => Object.prototype.toString.call(val);

  const type = toString(data).split(' ')[1].slice(0, -1);

  return /(Blob|FormData|ReadableStream|URLSearchParams)/i.test(type) || data instanceof ArrayBuffer;
}

export function isBodyData(data: any) {
  return typeof data === 'string' || isSpecialRequestBody(data);
}

export function useStream<T = any>(url: string, config: UseStreamConfig = {}): UseStreamHelpers {
  const loading = ref(false);

  let abortController: AbortController | null = null;

  const { method = 'POST' } = config;

  const create = async (options: UseStreamRequestOptions<T> = {}) => {
    loading.value = true;

    const { onMessage, onFinish, onError, onResponse } = options;

    const headers = { 'Content-Type': 'application/json', ...config.headers };

    let body = (isBodyData(options.data) ? options.data : JSON.stringify(options.data)) as BodyInit | null | undefined;

    method === 'GET' && (body = null);

    abortController = new AbortController();

    try {
      const response = await fetch(url, { method, headers, body, signal: abortController.signal });

      onResponse?.(response);

      if (!response.body) {
        throw new Error('Response body is null or not a stream');
      }

      await getBytes(response.body, getLines(getMessages(onMessage)));

      onFinish?.();
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        onError?.(err);
      }
    } finally {
      loading.value = false;
    }
  };

  const abort = () => {
    abortController?.abort();

    loading.value = false;
  };

  return {
    loading: readonly(loading),
    stream: { create, abort }
  };
}
