import { prisma } from "../..";
import { seedCategories } from "./categories";
import { seedColors } from "./color";
import { seedManufacturers } from "./manafacturers";
import { seedProducts } from "./products";
import { seedSizes } from "./size";

export async function main() {
	await prisma.account.deleteMany();
	await prisma.session.deleteMany();
	await prisma.verificationToken.deleteMany();
	await prisma.user.deleteMany();
	await prisma.manufacturer.deleteMany();
	await prisma.color.deleteMany();
	await prisma.material.deleteMany();
	await prisma.pattern.deleteMany();
	await prisma.cut.deleteMany();
	await prisma.collection.deleteMany();
	await prisma.size.deleteMany();
	await prisma.fileUpload.deleteMany();
	await prisma.category.deleteMany();
	await prisma.coupon.deleteMany();
	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();
	await prisma.product.deleteMany();
	await prisma.deliveryOption.deleteMany();

	console.info("Seeding...");

	seedManufacturers(prisma)
		.then(() => seedSizes(prisma))
		.then(() => seedColors(prisma))
		.then(() => seedCategories(prisma))
		.then(() => seedProducts(prisma));
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
