import { useRouter } from "next/router";

import { type NextPageWithLayout } from "../../../../../pages/_app";
import {
	Container,
	DashboardLayout,
} from "../../../../shared/layout/DashboardLayout";

export const DashboardProductEdit: NextPageWithLayout = () => {
	const router = useRouter();
	const id = Number((router.query as { id: string })["id"]);

	return <Container>{id}</Container>;
};

DashboardProductEdit.getLayout = (page) => (
	<DashboardLayout>{page}</DashboardLayout>
);
