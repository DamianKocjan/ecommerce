import {
	nextAuthOptions,
	unstable_getServerSession as getServerSession,
} from "@ecommerce/auth";
import { prisma } from "@ecommerce/prisma";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

export async function createTrpcContext({
	req,
	res,
}: CreateNextContextOptions) {
	const session = await getServerSession(req, res, nextAuthOptions);

	return {
		prisma,
		session,
	};
}

export type TrpcRouterContextType = inferAsyncReturnType<
	typeof createTrpcContext
>;
