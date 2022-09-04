import { IconButton } from "@ecommerce/ui";
import { ShoppingCartSimple as ShoppingCartSimpleIcon } from "phosphor-react";
import React from "react";
import { useBag } from "./useBag";

export interface AddToBagIconButtonProps {
	productId: number;
}

export const AddToBagIconButton: React.FC<AddToBagIconButtonProps> = ({
	productId,
}) => {
	const { handleToggleBag, isInBag } = useBag(productId);

	return (
		<IconButton className="ml-2" onClick={handleToggleBag}>
			<span className="sr-only">Add to cart</span>
			<ShoppingCartSimpleIcon
				className="h-6 w-6"
				aria-hidden="true"
				weight={isInBag ? "fill" : undefined}
			/>
		</IconButton>
	);
};
