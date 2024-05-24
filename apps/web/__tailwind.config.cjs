/** @type {import("tailwindcss").Config} */
module.exports = {
	presets: [require("@ecommerce/tailwind-config")],
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/line-clamp"),
		require("@tailwindcss/typography"),
		require("tailwind-scrollbar")({ nocompatible: true }),
	],
};
