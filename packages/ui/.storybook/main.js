/** @type {import("@storybook/react/types").StorybookConfig} */
module.exports = {
	framework: "@storybook/react",
	stories: ["../**/*.stories.@(ts|tsx)"],
	addons: [
		"@storybook/addon-a11y",
		"@storybook/addon-actions",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-viewport",
		"storybook-addon-next-router",
		{
			/**
			 * Fix Storybook issue with PostCSS@8
			 * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
			 */
			name: "@storybook/addon-postcss",
			options: {
				postcssLoaderOptions: {
					implementation: require("postcss"),
				},
			},
		},
	],
	core: {
		builder: "webpack5",
	},
	logLevel: "debug",
	features: {
    interactionsDebugger: true,
    storyStoreV7: true,
	}
};
