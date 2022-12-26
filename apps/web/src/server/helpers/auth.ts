import { User } from "@ecommerce/prisma";
import { TRPCError } from "@trpc/server";

export function assertIsAdmin(
	user: User
): asserts user is User & { role: "ADMIN" } {
	if (user.role !== "ADMIN") {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
}
