import { ShoppingCartSimple } from "@phosphor-icons/react";
import { toast } from "sonner";

import { useBagDispatch, useBagForProduct } from "~/contexts/bag-context";
import { Button } from "../ui/button";

export function CartButton({ productSkuId }: { productSkuId: number }) {
	const { isInBag } = useBagForProduct(productSkuId);
	const dispatch = useBagDispatch();

	const handleBagAction = () => {
		if (isInBag) {
			dispatch({
				productSkuId,
				type: "REMOVE_FROM_BAG",
			});
			toast("Removed from bag", {
				description: "This product has been removed from your bag",
			});
			return;
		}

		dispatch({
			productSkuId,
			type: "ADD_TO_BAG",
		});
		toast("Added to bag", {
			description: "This product has been added to your bag",
		});
	};

	return (
		<Button variant="ghost" size="icon" type="button" onClick={handleBagAction}>
			<span className="sr-only">
				{isInBag ? "Remove from bag" : "Add to bag"}
			</span>
			<ShoppingCartSimple
				className="h-6 w-6"
				aria-hidden="true"
				weight={isInBag ? "fill" : undefined}
			/>
		</Button>
	);
}
