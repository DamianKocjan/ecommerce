export type Arrayish<T> = T | T[];

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
