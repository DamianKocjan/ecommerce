import * as trpcNext from "@trpc/server/adapters/next";
import { createTrpcContext } from "@/server/context";
import type { AppRouter } from "@/server";
import { appRouter } from "@/server";

export default trpcNext.createNextApiHandler<AppRouter>({
	router: appRouter,
	/**
	 * @link https://trpc.io/docs/context
	 */
	createContext: createTrpcContext,
	/**
	 * Data transformer
	 * @link https://trpc.io/docs/data-transformers
	 */

	/**
	 * @link https://trpc.io/docs/error-handling
	 */
	onError({ error }) {
		if (error.code === "INTERNAL_SERVER_ERROR") {
			// send to bug reporting
			console.error("Something went wrong", error);
		}
	},
	/**
	 * Enable query batching
	 */
	batching: {
		enabled: true,
	},
});
