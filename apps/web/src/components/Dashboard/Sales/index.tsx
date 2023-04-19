import type { NextPageWithLayout } from "../../../pages/_app";
import {
	Container,
	DashboardLayout,
} from "../../shared/layout/DashboardLayout";

export const DashboardSales: NextPageWithLayout = () => {
	return <Container title="Dashboard sales">{/* TODO */}</Container>;
};

DashboardSales.getLayout = (page) => {
	return <DashboardLayout>{page}</DashboardLayout>;
};
