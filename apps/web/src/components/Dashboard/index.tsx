import { NextPageWithLayout } from "../../pages/_app";
import { Container, DashboardLayout } from "../shared/layout/DashboardLayout";

export const Dashboard: NextPageWithLayout = () => {
	return (
		<Container title="Dashboard">
		</Container>
	);
};

Dashboard.getLayout = (page) => {
	return <DashboardLayout>{page}</DashboardLayout>;
};
