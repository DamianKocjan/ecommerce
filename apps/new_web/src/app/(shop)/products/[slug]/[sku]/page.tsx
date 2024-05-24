export default function ProductDetail({
	params,
}: {
	params: {
		slug: string;
		sku: string;
	};
}) {
	return (
		<div>
			<h1>
				Welcome to product: {params.slug} and sku: {params.sku}
			</h1>
		</div>
	);
}
