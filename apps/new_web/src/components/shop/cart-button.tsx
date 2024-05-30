import { ShoppingCartSimple } from "@phosphor-icons/react";
import { useBag } from "~/components/shared/layout/Bag/useBag";
import { Button } from "../ui/button";

export function CartButton({ productSkuId }: { productSkuId: number }) {
	const { handleToggleBag, isInBag } = useBag(productSkuId);

	return (
		<Button variant="ghost" onClick={handleToggleBag}>
			<span className="sr-only">Add to cart</span>
			<ShoppingCartSimple
				className="h-6 w-6"
				aria-hidden="true"
				weight={isInBag ? "fill" : undefined}
			/>
		</Button>
	);
}
