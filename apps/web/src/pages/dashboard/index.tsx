import type { GetServerSideProps } from "next";

import { Dashboard } from "../../components/Dashboard/Home";
import { withAuthRole } from "../../utils/withAuth";

export default Dashboard;

export const getServerSideProps: GetServerSideProps = withAuthRole(
	"ADMIN",
	async () => ({
		props: {},
	}),
);
