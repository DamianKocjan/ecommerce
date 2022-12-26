import { Grid, ProductCardShimmer } from "@ecommerce/ui";
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
			className="gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 py-4 sm:px-2"
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
