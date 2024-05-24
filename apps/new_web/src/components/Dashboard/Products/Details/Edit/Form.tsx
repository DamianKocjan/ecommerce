import React from "react";
import { RouterOutputs } from "~/utils/trpc";

interface FormProps {
	product: RouterOutputs["dashboard"];
}

export const Form: React.FC = () => {
	return <div>Form</div>;
};
