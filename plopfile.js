/* eslint-disable no-undef */
module.exports = function (/** @type {import('plop').NodePlopAPI} */ plop) {
	plop.setGenerator("component", {
		description: "Create a new component",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of your component?",
				validate: (value) => {
					if (value.length < 3) {
						return "Component name must be at least 3 characters";
					}
					return true;
				},
			},
			{
				type: "confirm",
				name: "isCVA",
				message: "Is this a CVA component?",
			},
		],
		actions: function ({ isCVA }) {
			return [
				{
					type: "add",
					path: "packages/ui/src/{{properCase name}}/{{properCase name}}.tsx",
					templateFile: isCVA
						? ".templates/component/component-cva.hbs"
						: ".templates/component/component.hbs",
				},
				// {
				// 	type: "add",
				// 	path: "packages/ui/src/{{properCase name}}/{{properCase name}}.test.ts",
				// 	templateFile: ".templates/component/component.test.hbs",
				// },
				{
					type: "add",
					path: "packages/ui/src/{{properCase name}}/{{properCase name}}.stories.tsx",
					templateFile: ".templates/component/component.stories.hbs",
				},
				{
					type: "add",
					path: "packages/ui/src/{{properCase name}}/index.ts",
					templateFile: ".templates/component/component.index.hbs",
				},
				{
					type: "append",
					path: "packages/ui/src/index.ts",
					// eslint-disable-next-line quotes
					template: 'export * from "./{{properCase name}}";\n',
					unique: true,
					separator: "",
				},
			];
		},
	});

	/** TODO: fix path issue
	 * cannot generate page with path "/example/[id]"
	 * it gets generated as "/example/id"
	 */
	plop.setGenerator("page", {
		description: "Create a new page",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of your page?",
				validate: (value) => {
					if (value.length < 3) {
						return "Page name must be at least 3 characters";
					}
					return true;
				},
			},
			{
				type: "input",
				name: "path",
				message: "What is the path of your page?",
				default: "/example/[id]",
				validate: (value) => {
					if (value.length < 3) {
						return "Path must be at least 3 characters";
					}
					return true;
				},
			},
		],
		actions: [
			{
				type: "add",
				path: "apps/web/src/pages/{{pathCase path}}.tsx",
				templateFile: ".templates/page/page.hbs",
			},
			{
				type: "add",
				path: "apps/web/src/components/{{properCase name}}/index.tsx",
				templateFile: ".templates/page/component.hbs",
			},
		],
	});

	plop.setGenerator("e2e test", {
		description: "Create a new e2e test",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of your test?",
				validate: (value) => {
					if (value.length < 3) {
						return "Test name must be at least 3 characters";
					}
					return true;
				},
			},
		],
		actions: [
			{
				type: "add",
				path: "lib/e2e/cypress/e2e/{{properCase name}}.cy.ts",
				templateFile: ".templates/test/e2e.hbs",
			},
		],
	});

	plop.setGenerator("e2e fixture", {
		description: "Create a new e2e fixture",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is the name of your fixture?",
				validate: (value) => {
					if (value.length < 3) {
						return "Fixture name must be at least 3 characters";
					}
					return true;
				},
			},
		],
		actions: [
			{
				type: "add",
				path: "lib/e2e/cypress/fixtures/{{camelCase name}}.json",
				templateFile: ".templates/test/e2e.fixture.hbs",
			},
		],
	});

	plop.setHelper("append", (text, postfix) => {
		return text + postfix;
	});
};
