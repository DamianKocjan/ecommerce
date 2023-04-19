import { type NextPageWithLayout } from "../../../pages/_app";
import {
	Container,
	DashboardLayout,
} from "../../shared/layout/DashboardLayout";

export const DashboardReviews: NextPageWithLayout = () => {
	return <Container title="Dashboard reviews">{/* TODO */}</Container>;
};

DashboardReviews.getLayout = (page) => (
	<DashboardLayout>{page}</DashboardLayout>
);
