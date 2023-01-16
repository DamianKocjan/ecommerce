export function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(
	min: number,
	max: number,
	precision?: number,
): number {
	if (!precision) {
		return Math.random() * (max - min + 1) + min;
	}
	return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
}

export function randomBool(min: number): boolean {
	return Math.random() > min;
}

export function randomElement<T>(array: T[]): T {
	return array[Math.floor(Math.random() * array.length)] as T;
}
