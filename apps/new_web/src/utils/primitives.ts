export type Arrayish<T> = T | T[];

export type Maybe<T> = T | null | undefined;
export type MaybePromise<T> = T | Promise<T>;

type FromPromise<T> = T extends Promise<infer U> ? U : T;
export type AsyncReturnType<T extends (...args: never) => Promise<unknown>> =
	FromPromise<ReturnType<T>>;

export function isNumber(value: string): boolean {
	if (value === "") {
		return false;
	}
	return !isNaN(Number(value));
}

export function tryToNumber(value: string): number | string {
	if (value === "") {
		return "";
	}
	return isNumber(value) ? Number(value) : value;
}

export function stringifyValue<
	T extends {
		toString(): string;
	},
>(value: T): string {
	if (Array.isArray(value)) {
		return `[${value.toSorted().join(",")}]`;
	}
	return value.toString();
}

export function isNothing(value: unknown): boolean {
	if (Array.isArray(value)) {
		return value.length === 0;
	}
	return value === null || value === undefined || value === "";
}

export function deepCompare<T, U>(a: T, b: U): boolean {
	return JSON.stringify(a) === JSON.stringify(b);
}

type AnyObjectPrimitiveValue = Arrayish<number | string | boolean>;
type AnyObject = Record<string, AnyObjectPrimitiveValue>;

export function combineObjects<T extends AnyObject, U extends AnyObject>(
	a: T,
	b: U,
): T & U {
	const obj: AnyObject = {};

	for (const key in a) {
		obj[key] = a[key]!;
	}

	for (const key in b) {
		const bValue = b[key]!;

		if (key in obj) {
			const aValue = obj[key]!;

			if (Array.isArray(aValue) && Array.isArray(bValue)) {
				obj[key] = [...new Set([...aValue, ...bValue])];
				continue;
			} else if (["string", "number", "boolean"].includes(typeof obj[key])) {
				obj[key] = bValue;
				continue;
			}
		}
		obj[key] = bValue;
	}
	return obj as T & U;
}

export function cleanUpObject<T extends AnyObject>(obj: Partial<T>): T {
	const newObj: AnyObject = {};

	for (const key in obj) {
		if (!isNothing(obj[key])) {
			newObj[key] = obj[key]!;
		}
	}

	return newObj as T;
}

export function removeKeys<T extends AnyObject>(
	obj: T,
	keys: (keyof T)[],
): Omit<T, keyof T> {
	const clone = structuredClone(obj);

	for (const key of keys) {
		delete clone[key];
	}

	return clone;
}
