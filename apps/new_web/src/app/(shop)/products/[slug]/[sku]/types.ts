import type { getProduct } from "~/server/products";
import type { AsyncReturnType } from "~/utils/primitives";

export type Product = NonNullable<AsyncReturnType<typeof getProduct>>;
