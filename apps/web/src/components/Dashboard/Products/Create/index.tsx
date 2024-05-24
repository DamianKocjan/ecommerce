import {
	Container,
	DashboardLayout,
} from "~/components/shared/layout/DashboardLayout";
import { type NextPageWithLayout } from "~/pages/_app";
import { ProductCreateForm } from "./Form";
import { SubmitHandler, useProductCreateForm } from "./useProductCreateForm";

export const DashboardProductCreate: NextPageWithLayout = () => {
	const { form, handleRemoveSku } = useProductCreateForm();

	console.log(form.formState.errors);

	const handleSubmit: SubmitHandler = (data) => {
		console.log(data);
	};

	return (
		<Container>
			<ProductCreateForm
				form={form}
				handleRemoveSku={handleRemoveSku}
				onSubmit={handleSubmit}
			/>
		</Container>
	);
};

DashboardProductCreate.getLayout = (page) => (
	<DashboardLayout>{page}</DashboardLayout>
);
