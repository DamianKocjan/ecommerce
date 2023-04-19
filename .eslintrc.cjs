/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: ["prettier", "eslint:recommended"],
	overrides: [
		{
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
			],
			files: ["**/*.ts", "**/*.tsx"],
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: [
					"./tsconfig.json",
					"./apps/*/tsconfig.json",
					"./packages/*/tsconfig.json",
					"./packages/db/prisma/tsconfig.json",
				],
			},
		},
	],
	root: true,
	reportUnusedDisableDirectives: true,
	ignorePatterns: [
		".eslintrc.js",
		"**/*.config.js",
		"**/*.config.cjs",
		"packages/config/**",
	],
};
