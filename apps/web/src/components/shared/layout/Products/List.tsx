import { Grid } from "~/components/shared/core/Grid";
import { ProductCardShimmer } from "~/components/shared/core/ProductCardShimmer";
import { ProductCard } from "./Card";
import { Product } from "./types";

export interface ProductsListProps<T extends Product> {
	products: T[] | undefined;
	isLoading: boolean;
}

export function ProductsList<T extends Product>({
	products,
	isLoading,
}: ProductsListProps<T>) {
	return (
		<Grid
			cols="1"
			className="gap-x-6 gap-y-10 py-4 sm:grid-cols-2 sm:px-2 lg:grid-cols-3 xl:gap-x-8"
		>
			{isLoading
				? Array.from({ length: 6 }).map((_, i) => (
						<ProductCardShimmer key={`product-shimmer-${i}`} />
				  ))
				: products?.map((product) => (
						<ProductCard key={product.slug} product={product} />
				  ))}
		</Grid>
	);
}
