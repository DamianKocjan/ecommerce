const fs = require("fs");
const writeFile = fs.promises.writeFile;
const { stringify } = require("envfile");
const inputs = require("./inputs/dev.env.json");

const main = async () => {
	const handleRoot = async () => {
		let rootFile = {};

		rootFile.POSTGRES_USER = inputs.POSTGRES_USER;
		rootFile.POSTGRES_PASSWORD = inputs.POSTGRES_PASSWORD;
		rootFile.POSTGRES_HOST = inputs.POSTGRES_HOST;
		rootFile.POSTGRES_PORT = inputs.POSTGRES_PORT;
		rootFile.POSTGRES_DB = inputs.POSTGRES_DB;

		await writeFile("./.env", stringify(rootFile));
	};

	handleRoot();

	let file = {};

	file.DATABASE_URL = `postgres://${inputs.POSTGRES_USER}:${inputs.POSTGRES_PASSWORD}@${inputs.POSTGRES_HOST}:${inputs.POSTGRES_PORT}/${inputs.POSTGRES_DB}?schema=public`;
	await writeFile("./packages/prisma/.env", stringify(file));

	file.NEXTAUTH_URL = inputs.NEXTAUTH_URL;
	file.NEXTAUTH_SECRET = inputs.NEXTAUTH_SECRET;
	file.GOOGLE_CLIENT_ID = inputs.GOOGLE_CLIENT_ID;
	file.GOOGLE_CLIENT_SECRET = inputs.GOOGLE_CLIENT_SECRET;

	await writeFile("./apps/web/.env", stringify(file));
};

main()
	.then(() => {
		console.log("See developer develop.");
	})
	.catch((err) => {
		console.error(err);
		process.exit(0);
	});
