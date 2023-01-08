import { Prisma } from "@ecommerce/db";

export type DecimalToNumber<T> = T extends Prisma.Decimal
	? number
	: T extends Date
	? string
	: T extends Array<infer U>
	? Array<DecimalToNumber<U>>
	: T extends number | string | null | undefined
	? T
	: T extends Record<string, never>
	? {
			[K in keyof T]: DecimalToNumber<T[K]>;
	  }
	: T;

export function convertDecimalToNumber<T>(obj: T): DecimalToNumber<T> {
	let result: unknown;

	if (obj instanceof Prisma.Decimal) {
		console.log(obj.toNumber());

		result = obj.toNumber();
	} else if (obj instanceof Date) {
		result = obj.toISOString();
	} else if (
		typeof obj === "number" ||
		typeof obj === "string" ||
		obj === null ||
		obj === undefined
	) {
		result = obj;
	} else if (Array.isArray(obj)) {
		result = obj.map((item) => convertDecimalToNumber(item));
	} else if (typeof obj === "object") {
		result = {} as DecimalToNumber<T>;

		const keys = Object.keys(obj as object);
		keys.map((key) => {
			if (obj.hasOwnProperty(key)) {
				// @ts-ignore
				result[key] = convertDecimalToNumber(obj[key]);
			}
		});
	}

	return result as DecimalToNumber<T>;
}
