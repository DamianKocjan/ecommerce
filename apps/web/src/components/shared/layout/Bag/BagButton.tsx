import React from "react";

import { Button } from "../../core/Button";
import { useBag } from "./useBag";

export interface AddToBagButtonProps {
	productSlug: string;
}

export const AddToBagButton: React.FC<AddToBagButtonProps> = ({
	productSlug,
}) => {
	const { handleToggleBag, isInBag } = useBag(productSlug);

	return (
		<Button intent="secondary" type="button" onClick={handleToggleBag}>
			{isInBag ? "Remove from bag" : "Add to bag"}
		</Button>
	);
};
