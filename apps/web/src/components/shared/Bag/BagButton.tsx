import { Button } from "@ecommerce/ui";
import { useBag } from "./useBag";

export interface AddToBagButtonProps {
	productId: number;
}

export const AddToBagButton: React.FC<AddToBagButtonProps> = ({
	productId,
}) => {
	const { handleToggleBag, isInBag } = useBag(productId);

	return (
		<Button intent="secondary" type="button" onClick={handleToggleBag}>
			{isInBag ? "Remove from bag" : "Add to bag"}
		</Button>
	);
};
