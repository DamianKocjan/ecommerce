import {
	Container,
	DashboardLayout,
} from "~/components/shared/layout/DashboardLayout";
import { type NextPageWithLayout } from "~/pages/_app";

export const DashboardReviews: NextPageWithLayout = () => {
	return <Container title="Dashboard reviews">{/* TODO */}</Container>;
};

DashboardReviews.getLayout = (page) => (
	<DashboardLayout>{page}</DashboardLayout>
);
