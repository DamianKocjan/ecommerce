import { ShoppingCartSimple } from "@phosphor-icons/react";
import { toast } from "sonner";

import { useBagDispatch, useBagForProduct } from "~/contexts/bag-context";
import { Button } from "../ui/button";

type Props = {
	productSkuId: number;
	quantity?: number;
};

export function CartIconButton({ productSkuId, quantity = 1 }: Props) {
	const { isInBag } = useBagForProduct(productSkuId);
	const dispatch = useBagDispatch();

	const handleBagAction = () => {
		if (isInBag) {
			dispatch({
				type: "REMOVE_FROM_BAG",
				productSkuId,
			});
			toast("Removed from bag", {
				description: "This product has been removed from your bag",
			});
			return;
		}

		dispatch({
			type: "ADD_TO_BAG",
			productSkuId,
			quantity,
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

export function CartButton({ productSkuId, quantity = 1 }: Props) {
	const { isInBag } = useBagForProduct(productSkuId);
	const dispatch = useBagDispatch();

	const handleBagAction = () => {
		if (isInBag) {
			dispatch({
				type: "REMOVE_FROM_BAG",
				productSkuId,
			});
			toast("Removed from bag", {
				description: "This product has been removed from your bag",
			});
			return;
		}

		dispatch({
			type: "ADD_TO_BAG",
			productSkuId,
			quantity,
		});
		toast("Added to bag", {
			description: "This product has been added to your bag",
		});
	};

	return (
		<Button variant="outline" type="button" onClick={handleBagAction}>
			<ShoppingCartSimple
				className="mr-2 h-4 w-4"
				aria-hidden="true"
				weight={isInBag ? "fill" : undefined}
			/>

			{isInBag ? "Remove from bag" : "Add to bag"}
		</Button>
	);
}
