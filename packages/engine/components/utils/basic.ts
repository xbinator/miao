import { unref, type Ref } from 'vue';
import { isString } from 'lodash-es';

export const noop = () => {
  //
};

type AsyncToResultError = [Error];

type AsyncToResultSuccess<T> = [undefined, T];

export async function asyncTo<T>(promise: Promise<T>): Promise<AsyncToResultError | AsyncToResultSuccess<T>> {
  try {
    const data = await promise;
    return [undefined, data];
  } catch (error) {
    return [error instanceof Error ? error : new Error(String(error))];
  }
}

type MaybeComputedElementRef = Element | string | null | Ref<Element | undefined>;

function makeDOMRect(width: number, height: number) {
  return { top: 0, left: 0, right: width, bottom: height, width, height } as DOMRect;
}

export const getClientRect = (target?: MaybeComputedElementRef) => {
  const _target = unref(target);

  const node = isString(_target) ? document.querySelector(_target) : _target;

  if (node?.getBoundingClientRect) {
    return node.getBoundingClientRect();
  }

  return makeDOMRect(0, 0);
};
