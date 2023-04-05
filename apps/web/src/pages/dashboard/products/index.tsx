import type { GetServerSideProps } from "next";

import { DashboardProducts } from "../../../components/Dashboard/Products";
import { withAuthRole } from "../../../utils/withAuth";

export default DashboardProducts;

export const getServerSideProps: GetServerSideProps = withAuthRole(
	"ADMIN",
	async () => ({
		props: {},
	}),
);
