import * as trpc from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { TrpcRouterContextType } from "../context";
import { categoryRouter } from "./category";
import { productRouter } from "./product";
import { sizeRouter } from "./size";
import { wishlistRouter } from "./wishlist";

// Primary api for interacting with "server side"
// Read more: https://trpc.io
export const appRouter = trpc
	.router<TrpcRouterContextType>()
	.transformer(superjson)
	.query("hello", {
		input: z
			.object({
				text: z.string().nullish(),
			})
			.nullish(),
		async resolve({ ctx, input }) {
			return {
				greeting: `hello ${input?.text ?? "world"} from ${JSON.stringify(
					ctx.session
				)}`,
			};
		},
	})
	.merge(categoryRouter)
	.merge(productRouter)
	.merge(sizeRouter)
	.merge(wishlistRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
