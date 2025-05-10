declare type AsyncResult<T, U = Error> = Promise<[U] | [undefined, T]>;
