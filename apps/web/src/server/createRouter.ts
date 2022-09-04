import * as trpc from "@trpc/server";
import { TrpcRouterContextType } from "./context";

export function createRouter() {
	return trpc.router<TrpcRouterContextType>();
}
