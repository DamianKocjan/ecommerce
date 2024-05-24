import {
	Container,
	DashboardLayout,
} from "~/components/shared/layout/DashboardLayout";
import type { NextPageWithLayout } from "~/pages/_app";

export const DashboardSales: NextPageWithLayout = () => {
	return <Container title="Dashboard sales">{/* TODO */}</Container>;
};

DashboardSales.getLayout = (page) => {
	return <DashboardLayout>{page}</DashboardLayout>;
};
