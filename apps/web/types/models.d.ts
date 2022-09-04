export interface Product {
	title: string;
	id: number;
	slug: string;
	description: string;
	price: Decimal;
	discount: Decimal | null;
	manufacturer: {
		id: number;
		name: string;
	};
}
