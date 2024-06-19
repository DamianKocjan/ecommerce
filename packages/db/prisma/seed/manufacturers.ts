import { faker } from "@faker-js/faker";
import type { Prisma, PrismaClient } from "../..";

const NUMBER_OF_MANUFACTURERS = 20;

export async function seedManufacturers(prisma: PrismaClient): Promise<void> {
	await prisma.manufacturer.createMany({
		data: generateManufacturers(),
	});
}

function generateManufacturers() {
	const manufacturers: Prisma.ManufacturerCreateInput[] = Array.from(
		{ length: NUMBER_OF_MANUFACTURERS },
		() => ({
			name: faker.company.name(),
			description: faker.lorem.paragraph(),
			country: faker.location.country(),
			headquarters: faker.location.city(),
			yearOfFoundation: faker.date.past().getFullYear(),
		}),
	);

	return manufacturers;
}
