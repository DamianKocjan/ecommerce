import { type Prisma } from "@ecommerce/prisma";
import superjson from "superjson";

// TODO: union with Prisma.Decimal
type Serialized<T extends {}> = {
	[K in keyof T]: T[K] extends Prisma.Decimal
		? number
		: T[K] extends {}
		? Serialized<T[K]>
		: T[K];
};

export function makeSerializable<T extends {}>(obj: T): Serialized<T> {
	return superjson.parse(superjson.stringify(obj));
}
