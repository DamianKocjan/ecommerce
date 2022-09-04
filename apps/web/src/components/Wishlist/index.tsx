import { trpc } from "@/utils/trpc";
import { PrettyContainer } from "@ecommerce/ui";
import { useCallback, useState } from "react";
import { Container } from "../shared/Container";
import { Filters } from "../shared/Products/Filters";
import { ProductsList } from "../shared/Products/List";
import { ListFooter } from "../shared/Products/ListFooter";
import { type Cursor } from "../shared/Products/ListFooter/Pagination";
import { PER_PAGE } from "../shared/Products/ListFooter/PerPage";

export function Wishlist() {
	const [perPage, setPerPage] = useState(
		typeof window !== "undefined"
			? Number(window.localStorage.getItem("perPage")) || PER_PAGE[0]
			: PER_PAGE[0]
	);
	const [cursor, setCursor] = useState<string | undefined>(undefined);

	const handlePerPageChange = useCallback((value: number) => {
		setPerPage(value);
		window.localStorage.setItem("perPage", value.toString());
	}, []);

	const wishlisted = trpc.useQuery(
		["wishlistedProducts", { perPage, cursor }],
		{
			refetchOnWindowFocus: false,
		}
	);

	return (
		<Container title="Your wishlist">
			<PrettyContainer className="mt-4">
				<h1 className="text-3xl">Your wishlist</h1>
			</PrettyContainer>
			<div className="my-2 mx-4">
				<Filters />
				<ProductsList
					isLoading={wishlisted.isLoading}
					products={wishlisted.data?.items.map((item) => item.product)}
				/>
				<ListFooter
					handlePerPageChange={handlePerPageChange}
					perPage={perPage}
					setCursor={
						setCursor as React.Dispatch<
							React.SetStateAction<Cursor | undefined>
						>
					}
					nextCursor={wishlisted.data?.nextCursor}
					prevCursor={wishlisted.data?.prevCursor}
				/>
			</div>
		</Container>
	);
}

Wishlist.auth = true;
