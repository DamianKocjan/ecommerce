import { Button } from "@ecommerce/ui";
import { useBag } from "./useBag";

export interface AddToBagButtonProps {
	product: string;
}

export const AddToBagButton: React.FC<AddToBagButtonProps> = ({ product }) => {
	const { handleToggleBag, isInBag } = useBag(product);

	return (
		<Button intent="secondary" type="button" onClick={handleToggleBag}>
			{isInBag ? "Remove from bag" : "Add to bag"}
		</Button>
	);
};
