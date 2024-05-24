import { getServerSession, type Session } from "@ecommerce/auth";
import { Role } from "@ecommerce/db";
import type { GetServerSideProps } from "next";

type GetServerSidePropsWithSession = (
	context: Parameters<GetServerSideProps>[number] & { session: Session },
) => ReturnType<GetServerSideProps>;

export const withAuth = (
	fn: GetServerSidePropsWithSession,
): GetServerSideProps => {
	return async (context) => {
		const session = await getServerSession(context);

		if (!session) {
			return {
				redirect: {
					destination: "/api/auth/signin",
					permanent: false,
				},
			};
		}

		return await fn(Object.assign(context, { session }));
	};
};

export const withAuthRole = (
	requiredRole: Role,
	fn: GetServerSidePropsWithSession,
): GetServerSideProps => {
	return async (context) => {
		const session = await getServerSession(context);

		if (!session) {
			return {
				redirect: {
					destination: "/api/auth/signin",
					permanent: false,
				},
			};
		}

		if (session.user.role !== requiredRole) {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}

		return await fn(Object.assign(context, { session }));
	};
};
