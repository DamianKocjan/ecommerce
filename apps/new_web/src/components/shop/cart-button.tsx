import { ShoppingCartSimple } from "@phosphor-icons/react";

import { useBagDispatch, useBagForProduct } from "~/contexts/bag-context";
import { Button } from "../ui/button";

export function CartButton({ productSkuId }: { productSkuId: number }) {
	const { isInBag } = useBagForProduct(productSkuId);
	const dispatch = useBagDispatch();

	return (
		<Button
			variant="ghost"
			onClick={() =>
				dispatch({
					productSkuId,
					type: isInBag ? "REMOVE_FROM_BAG" : "ADD_TO_BAG",
				})
			}
		>
			<span className="sr-only">Add to cart</span>
			<ShoppingCartSimple
				className="h-6 w-6"
				aria-hidden="true"
				weight={isInBag ? "fill" : undefined}
			/>
		</Button>
	);
}
