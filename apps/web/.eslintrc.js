module.exports = {
	env: { "jest/globals": true, browser: true, es2021: true },
	extends: [
		"jest",
		"next/core-web-vitals",
		"only-warn",
		"plugin:@typescript-eslint/recommended",
		"plugin:jest/recommended",
		"plugin:prettier/recommended",
		"plugin:react/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
	ignorePatterns: [
		"**/*.js",
		"node_modules",
		".turbo",
		"dist",
		"build",
		"coverage",
	],
};
