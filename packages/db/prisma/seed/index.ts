import { prisma } from "../..";
import { seedCategories } from "./categories";
import { seedManufacturers } from "./manufacturers";
import { seedProducts } from "./products";

export async function main() {
	await prisma.account.deleteMany();
	await prisma.session.deleteMany();
	await prisma.verificationToken.deleteMany();
	await prisma.user.deleteMany();
	await prisma.category.deleteMany();
	await prisma.image.deleteMany();
	await prisma.attributeValue.deleteMany();
	await prisma.attribute.deleteMany();
	await prisma.productVariant.deleteMany();
	await prisma.coupon.deleteMany();
	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();
	await prisma.product.deleteMany();
	await prisma.manufacturer.deleteMany();
	await prisma.deliveryOption.deleteMany();

	console.info("Seeding...");

	seedManufacturers(prisma)
		.then(() => seedCategories(prisma))
		.then(() => seedProducts(prisma))
		.catch(() => void 0);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
