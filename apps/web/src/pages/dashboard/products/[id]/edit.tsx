import type { GetServerSideProps } from "next";

import { DashboardProductEdit } from "../../../../components/Dashboard/Products/Details/Edit";
import { withAuthRole } from "../../../../utils/withAuth";

export default DashboardProductEdit;

export const getServerSideProps: GetServerSideProps = withAuthRole(
	"ADMIN",
	async () => ({
		props: {},
	}),
);
