import type { Prisma, PrismaClient } from "..";

const SIZES: Prisma.SizeCreateInput[] = [
	{
		name: "S",
	},
	{
		name: "M",
	},
	{
		name: "L",
	},
	{
		name: "XL",
	},
	{
		name: "XXL",
	},
	{
		name: "21",
	},
	{
		name: "22",
	},
	{
		name: "23",
	},
	{
		name: "24",
	},
	{
		name: "25",
	},
	{
		name: "26",
	},
	{
		name: "27",
	},
	{
		name: "28",
	},
	{
		name: "29",
	},
	{
		name: "30",
	},
	{
		name: "31",
	},
	{
		name: "32",
	},
	{
		name: "33",
	},
	{
		name: "34",
	},
	{
		name: "35",
	},
	{
		name: "36",
	},
	{
		name: "37",
	},
	{
		name: "38",
	},
	{
		name: "39",
	},
];

export async function seedSizes(prisma: PrismaClient): Promise<void> {
	await prisma.size.createMany({
		data: SIZES,
	});
}
