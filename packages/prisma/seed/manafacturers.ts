import type { Prisma, PrismaClient } from "..";

const MANUFACTURERS: Prisma.ManufacturerCreateInput[] = [
	{
		name: "Nike",
		description:
			"Nike is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services.",
		country: "USA",
		headquarters: "Beaverton, Oregon, U.S.",
		yearOfFoundation: 1964,
	},
	{
		name: "Adidas",
		description:
			"Adidas AG is a German multinational corporation that manufactures and markets sports shoes, apparel, and equipment.",
		country: "Germany",
		headquarters: "Herzogenaurach, Bavaria, Germany",
		yearOfFoundation: 1949,
	},
	{
		name: "Tommy Hilfiger",
		description:
			"Tommy Hilfiger B.V. formerly known as Tommy Hilfiger Corporation and Tommy Hilfiger Inc., is an American premium clothing brand, manufacturing apparel, footwear, accessories, fragrances and home furnishings",
		country: "Netherlands",
		headquarters: "Amsterdam, Netherlands",
		yearOfFoundation: 1985,
	},
];

export async function seedManufacturers(prisma: PrismaClient): Promise<void> {
	await prisma.manufacturer.createMany({
		data: MANUFACTURERS,
	});
}
