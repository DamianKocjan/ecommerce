import { Flex } from "@ecommerce/ui";
import { useRouter } from "next/router";
import { Categories } from "../shared/Categories";
import { Container } from "../shared/Container";
import { Filters } from "../shared/Products/Filters";

export function Products() {
	const router = useRouter();

	return (
		<Container title="Products">
			<Flex className="gap-4 py-4">
				<Categories />
				<div className="w-3/4">
					<Filters />
					{/* <ProductsList products={products} /> */}
				</div>
			</Flex>
		</Container>
	);
}
