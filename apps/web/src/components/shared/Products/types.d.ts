export interface Product {
	id: number;
	slug: string;
	title: string;
	thumbnailImage: string;
	price: number;
	discount: number | null;
	manufacturer: { id: number; name: string };
}
