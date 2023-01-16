import type { Prisma, PrismaClient } from "../..";

const COLORS = [
	"Aqua",
	"Azure",
	"Black",
	"Brown",
	"Blue",
	"Crimson",
	"Grey",
	"Magenta",
	"Green",
	"Orange",
	"Violet",
	"Pink",
	"Indigo",
	"Lime",
	"Maroon",
	"Navy",
	"Olive",
	"Purple",
	"Red",
	"Teal",
	"Turquoise",
	"White",
	"Yellow",
];

const COLORS_DATA: Prisma.ColorCreateInput[] = COLORS.map((color) => ({
	name: color,
}));

export async function seedColors(prisma: PrismaClient): Promise<void> {
	await prisma.color.createMany({
		data: COLORS_DATA,
	});
}
