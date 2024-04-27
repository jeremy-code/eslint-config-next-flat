import next from "@next/eslint-plugin-next";
import eslintImport from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig} */
export default {
	plugins: {
		/**
		 * Plugins that aren't patched for Next.js (e.g. have metadata property) are
		 * not usable with --cache or --print-config
		 *
		 * {@see https://eslint.org/docs/latest/extend/plugin-migration-flat-config#adding-plugin-meta-information}
		 */
		import: eslintImport, // not patched
		react,
		"jsx-a11y": jsxA11y, // not patched
		"react-hooks": reactHooks, // not patched
		"@next/next": next, // not patched
	},
	rules: {
		...react.configs.recommended.rules,
		...react.configs["jsx-runtime"].rules, // jsx-runtime for react-in-jsx-scope
		...reactHooks.configs.recommended.rules,
		...next.configs.recommended.rules,
		// when using @vercel/og (which is bundled into Next.js), tw prop is possible
		// see https://github.com/vercel/next.js/blob/canary/packages/next/src/compiled/%40vercel/og/types.d.ts#L115
		"react/no-unknown-property": ["error", { ignore: ["tw"] }],
	},

	languageOptions: {
		globals: {
			...globals.browser,
			...globals.node,
		},
		// No custom parser options or Babel parser, as typescript-esLint & Babel seem to have some conflicts, see https://github.com/typescript-eslint/typescript-eslint/issues/3517
		parserOptions: {
			ecmaFeatures: {
				jsx: true, // set true by eslint-plugin-react default config
			},
		},
	},
	settings: {
		react: {
			version: "detect",
		},
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".mts", ".cts", ".tsx", ".d.ts"],
		},
		"import/resolver": {
			"eslint-import-resolver-node": {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
			"eslint-import-resolver-typescript": {
				alwaysTryTypes: true,
			},
		},
	},
};
