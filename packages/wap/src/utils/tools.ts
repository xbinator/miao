import { isString, isUndefined } from 'lodash-es';

export async function tryit<U, T>(fn: Promise<T>): AsyncResult<T, U> {
  try {
    return [undefined, await fn];
  } catch (error) {
    return [error as U];
  }
}

export function safeJsonParse<T = any>(data?: string, defaultValue: any = null) {
  if (isUndefined(data)) return defaultValue as T;

  if (!isString(data)) return data;

  let value = defaultValue;

  try {
    value = JSON.parse(data);
  } catch (error) {
    console.log(data);
  }

  return value as T;
}
