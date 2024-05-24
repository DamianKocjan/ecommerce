export interface Product {
	id: number;
	slug: string;
	title: string;
	description: string;
	skus: {
		id: number;
		sku: string;
		thumbnailImage: number;
		images: {
			url: string;
		}[];
		price: number | null;
		discount: number | null;
	}[];
	price: number;
	discount: number | null;
	manufacturer: { id: number; name: string };
}
