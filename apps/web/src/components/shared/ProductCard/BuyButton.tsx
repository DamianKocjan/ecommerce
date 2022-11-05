import { useBag } from "@/features/bag";
import { Button } from "@ecommerce/ui";
import { useCallback } from "react";

export interface BuyButtonProps {
	disabled: boolean;
	product: {
		slug: string;
		price: number;
		quantity: number;
	};
}

export const BuyButton: React.FC<BuyButtonProps> = ({ disabled, product }) => {
	const addToBag = useBag((state) => state.addToBag);

	const handleAddToBag = useCallback(
		(e: React.FormEvent<HTMLButtonElement>) => {
			e.preventDefault();
			addToBag(product.slug);
		},
		[addToBag, product]
	);

	return (
		<Button type="submit" disabled={disabled} onClick={handleAddToBag}>
			Buy now
		</Button>
	);
};
