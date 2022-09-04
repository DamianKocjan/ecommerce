const fs = require("fs");
const unlink = fs.promises.unlink;

const main = async () => {
	await unlink("./apps/web/.env");
	await unlink("./packages/prisma/.env");
};

main()
	.then(() => {
		console.log("All environment files have been deleted.");
		process.exit(0);
	})
	.catch(() => {
		console.log("Looks like you are good to go!");
		process.exit(0);
	});
