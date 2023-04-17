import { useRouter } from "next/router";

import { type NextPageWithLayout } from "../../../../pages/_app";
import { trpc } from "../../../../utils/trpc";
import {
	Container,
	DashboardLayout,
} from "../../../shared/layout/DashboardLayout";
import { Analytics, AnalyticsLoading } from "./Analytics";
import { Info, InfoLoading } from "./Info";

export const DashboardProductDetails: NextPageWithLayout = () => {
	const router = useRouter();
	const id = Number((router.query as { id: string })["id"]);

	const { data, isLoading } = trpc.dashboard.product.useQuery(id, {
		refetchOnWindowFocus: false,
	});

	return (
		<Container>
			{isLoading || !data ? (
				<>
					<InfoLoading />
					<AnalyticsLoading />
				</>
			) : (
				<>
					<Info
						price={data.product.price as unknown as number}
						discount={data.product.discount as unknown as number | null}
						slug={data.product.slug}
						title={data.product.title}
						shortDescription={data.product.shortDescription}
						thumbnailImage={data.product.thumbnailImage}
					/>

					<Analytics />
				</>
			)}
		</Container>
	);
};

DashboardProductDetails.getLayout = (page) => (
	<DashboardLayout>{page}</DashboardLayout>
);
