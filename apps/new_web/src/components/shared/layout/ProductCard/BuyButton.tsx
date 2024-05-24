import React, { useCallback } from "react";

import { Button } from "~/components/shared/core/Button";
import { useBagStore } from "../Bag/store";

export interface BuyButtonProps {
	disabled: boolean;
	product: {
		slug: string;
		price: number;
		quantity: number;
	};
}

export const BuyButton: React.FC<BuyButtonProps> = ({ disabled, product }) => {
	const addToBag = useBagStore((state) => state.addToBag);

	const handleAddToBag = useCallback(
		(e: React.FormEvent<HTMLButtonElement>) => {
			e.preventDefault();
			addToBag(product.slug);
		},
		[addToBag, product],
	);

	return (
		<Button type="submit" disabled={disabled} onClick={handleAddToBag}>
			Buy now
		</Button>
	);
};
