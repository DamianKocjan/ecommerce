import type { GetServerSideProps } from "next";

import { DashboardSales } from "../../components/Dashboard/Sales";
import { withAuthRole } from "../../utils/withAuth";

export default DashboardSales;

export const getServerSideProps: GetServerSideProps = withAuthRole(
	"ADMIN",
	async () => ({
		props: {},
	}),
);
