import { InferQueryOutput } from "@/utils/trpc";
import { Grid, ProductCardShimmer } from "@ecommerce/ui";
import { ProductCard } from "./Card";

export interface ProductsListProps {
	products: InferQueryOutput<"products">["data"] | undefined;
	isLoading: boolean;
}

export const ProductsList: React.FC<ProductsListProps> = ({
	products,
	isLoading,
}) => {
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
};
