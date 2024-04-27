/** @type {import('rollup').RollupOptions} **/
export default {
	input: "src/index.js",
	external: [
		"@next/eslint-plugin-next",
		"eslint-plugin-import",
		"eslint-plugin-jsx-a11y",
		"eslint-plugin-react",
		"eslint-plugin-react-hooks",
		"globals",
		"next/dist/compiled/babel/eslint-parser.js",
	],
	output: [
		{
			file: "dist/cjs/index.cjs",
			format: "cjs",
		},
		{
			file: "dist/esm/index.js",
			format: "esm",
		},
	],
};
