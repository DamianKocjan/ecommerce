import { useRouter } from "next/router";

import {
	Container,
	DashboardLayout,
} from "~/components/shared/layout/DashboardLayout";
import { type NextPageWithLayout } from "~/pages/_app";

export const DashboardProductEdit: NextPageWithLayout = () => {
	const router = useRouter();
	const id = Number((router.query as { id: string })["id"]);

	return <Container>{id}</Container>;
};

DashboardProductEdit.getLayout = (page) => (
	<DashboardLayout>{page}</DashboardLayout>
);
