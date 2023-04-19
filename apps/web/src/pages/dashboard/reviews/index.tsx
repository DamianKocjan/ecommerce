import type { GetServerSideProps } from "next";

import { DashboardReviews } from "../../../components/Dashboard/Reviews";
import { withAuthRole } from "../../../utils/withAuth";

export default DashboardReviews;

export const getServerSideProps: GetServerSideProps = withAuthRole(
	"ADMIN",
	async () => ({
		props: {},
	}),
);
