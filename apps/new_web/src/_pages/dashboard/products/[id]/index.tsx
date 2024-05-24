import type { GetServerSideProps } from "next";

import { DashboardProductDetails } from "~/components/Dashboard/Products/Details";
import { withAuthRole } from "~/utils/withAuth";

export default DashboardProductDetails;

export const getServerSideProps: GetServerSideProps = withAuthRole(
	"ADMIN",
	async () => ({
		props: {},
	}),
);
