import { useBag } from "@/features/bag";
import { Button } from "@ecommerce/ui";
import { useCallback } from "react";

export interface BuyButtonProps {
	disabled: boolean;
	product: {
		id: number;
		price: number;
		quantity: number;
	};
}

export const BuyButton: React.FC<BuyButtonProps> = ({ disabled, product }) => {
	const addToBag = useBag((state) => state.addToBag);

	const handleAddToBag = useCallback(
		(e: React.FormEvent<HTMLButtonElement>) => {
			e.preventDefault();
			addToBag(product.id);
		},
		[addToBag, product]
	);

	return (
		<Button type="submit" disabled={disabled} onClick={handleAddToBag}>
			Buy now
		</Button>
	);
};
