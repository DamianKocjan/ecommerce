export type Arrayish<T> = T | T[];

export type Maybe<T> = T | null | undefined;
export type MaybePromise<T> = T | Promise<T>;

type FromPromise<T> = T extends Promise<infer U> ? U : T;
export type AsyncReturnType<T extends (...args: never) => Promise<unknown>> =
	FromPromise<ReturnType<T>>;

export function isNumber(value: string): boolean {
	return !isNaN(Number(value));
}

export function tryToNumber(value: string): number | string {
	return isNumber(value) ? Number(value) : value;
}

export function stringifyValue<
	T extends {
		toString(): string;
	},
>(value: T): string {
	if (Array.isArray(value)) {
		return `[${value.join(",")}]`;
	}
	return value.toString();
}
