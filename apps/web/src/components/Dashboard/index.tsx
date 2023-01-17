import { NextPageWithLayout } from "../../pages/_app";
import { Container } from "../shared/core/Container";
import { DashboardLayout } from "../shared/layout/DashboardLayout";

export const Dashboard: NextPageWithLayout = () => {
	return (
		<Container title="Dashboard">
			<h1 className="text-3xl">Dashboard</h1>
		</Container>
	);
};

Dashboard.getLayout = (page) => {
	return <DashboardLayout>{page}</DashboardLayout>;
};
