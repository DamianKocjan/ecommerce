import { Container } from "@/components/shared/Container";
import { type Product } from "@ecommerce/prisma";

export interface ProductDetailProps {
	product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
	return (
		<Container title={product?.title}>
			<h1 className="text-3xl">product detail</h1>
			<p>slug: {product?.slug}</p>
			<p>{JSON.stringify(product, null, 2)}</p>
		</Container>
	);
}
