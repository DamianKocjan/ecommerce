import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";
import { getServerSession as __getServerSession } from "next-auth";

import { authOptions } from "./authOptions";

export const getServerSession = async (
	ctx:
		| {
				req: GetServerSidePropsContext["req"];
				res: GetServerSidePropsContext["res"];
		  }
		| { req: NextApiRequest; res: NextApiResponse },
) => {
	return await __getServerSession(ctx.req, ctx.res, authOptions);
};
