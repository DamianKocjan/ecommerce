import { appRouter, createContext } from "@ecommerce/api";
import { createNextApiHandler } from "@trpc/server/adapters/next";

const handler = createNextApiHandler({
	router: appRouter,
	/**
	 * @link https://trpc.io/docs/context
	 */
	createContext,
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

export { handler as GET, handler as POST };
