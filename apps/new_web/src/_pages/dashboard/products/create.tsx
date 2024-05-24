import type { GetServerSideProps } from "next";

import { DashboardProductCreate } from "~/components/Dashboard/Products/Create";
import { withAuthRole } from "~/utils/withAuth";

export default DashboardProductCreate;

export const getServerSideProps: GetServerSideProps = withAuthRole(
	"ADMIN",
	async () => ({
		props: {},
	}),
);
