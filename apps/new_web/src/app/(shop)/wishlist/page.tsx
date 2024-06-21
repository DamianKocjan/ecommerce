import { authOptions } from "@ecommerce/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Filters } from "~/components/shop/filters";
import { Pagination } from "~/components/shop/pagination";
import {
	ProductCard,
	ProductCardSkeleton,
} from "~/components/shop/product-card";
import { H1, P } from "~/components/ui/typography";
import { getWishlistFilters, getWishlistedProducts } from "~/server/wishlist";
import { parseFilters } from "~/utils/product-filter";

export const metadata: Metadata = {
	title: "Wishlist",
};

export default async function Wishlist({
	searchParams,
}: {
	searchParams: Record<string, string>;
}) {
	const session = await getServerSession(authOptions);

	if (!session) {
		return redirect("/login?callbackUrl=/wishlist");
	}

	const filters = await parseFilters(searchParams, true);
	const [{ data, meta }, filtersData] = await Promise.all([
		getWishlistedProducts(Object.assign({ userId: session.user.id }, filters)),
		getWishlistFilters(session.user.id),
	]);

	return (
		<div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
			{data.length === 0 && Object.keys(filters).length === 0 ? (
				<div className="flex flex-col items-center gap-4">
					<Image
						src="/undraw_web_search_re_efla.svg"
						alt="Your wishlist is empty"
						width="600"
						height="400"
					/>

					<H1>Your wishlist is empty!</H1>
					<P>
						You can add products to your wishlist by clicking the heart icon
						next to the product.
					</P>
				</div>
			) : (
				<div className="grid gap-4 md:grid-cols-5">
					<Filters filters={filters} filtersData={filtersData} />

					<div className="col-span-4 flex flex-col gap-4">
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{data.map((product) => (
								<>
									<ProductCard key={product.id} product={product.product} />
									<ProductCardSkeleton key={product.id + 100} />
								</>
							))}
						</div>

						<Pagination
							currentPage={meta.currentPage}
							hasNextPage={meta.next !== undefined}
							hasPreviousPage={meta.prev !== meta.currentPage}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
