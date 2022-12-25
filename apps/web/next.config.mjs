import transpileModule from "next-transpile-modules";

const withTM = transpileModule([
	"@ecommerce/auth",
	"@ecommerce/prisma",
	"@ecommerce/ui",
]);

export default withTM({
	reactStrictMode: true,
	images: {
		domains: [
			"tailwindcss.com",
			"tailwindui.com",
			"images.unsplash.com",
			"source.unsplash.com",
			"picsum.photos",
		],
	},
	experimental: {
		images: {
			allowFutureImage: true,
		},
		swcPlugins: [
			[
				"next-superjson-plugin",
				{
					excluded: [],
				},
			],
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
});
