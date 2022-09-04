import { ProductCard } from "@/components/shared/ProductCard/ProductCard";
import { Box, Button } from "@ecommerce/ui";
import { Container } from "../shared/Container";

export function Home() {
	return (
		<Container>
			<h1 className="text-3xl">Web</h1>
			<Box margin={8} padding={8}>
				<Button intent="primary">hello</Button>
			</Box>

			<ProductCard
				title="Retro Shoe"
				price={100}
				image="https://tailwindcss.com/_next/static/media/retro-shoe.ee965cd22237d00d4225236bbaf5edc1.jpg"
				sizes={new Set(["S", "M", "L", "XL", "XXL"])}
				inStock
			/>
		</Container>
	);
}
