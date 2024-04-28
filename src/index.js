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
		 * Plugins that aren't patched for ESLint flat config (e.g. have metadata
		 * property) are not usable with --cache or --print-config. All plugins used
		 * have yet to be patched.
		 * {@see https://eslint.org/docs/latest/extend/plugin-migration-flat-config#adding-plugin-meta-information}
		 */
		import: eslintImport,
		react,
		"jsx-a11y": jsxA11y,
		"react-hooks": reactHooks,
		"@next/next": next,
	},
	rules: {
		...react.configs.recommended.rules,
		...react.configs["jsx-runtime"].rules, // Allow `react-in-jsx-scope` in React 17
		...reactHooks.configs.recommended.rules,
		...next.configs.recommended.rules,

		/**
		 * `@vercel/og` (which is bundled into Next.js) uses `tw` prop
		 * {@see https://github.com/vercel/next.js/blob/canary/packages/next/src/compiled/%40vercel/og/types.d.ts#L115}
		 * {@see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md}
		 */
		"react/no-unknown-property": ["error", { ignore: ["tw"] }],
	},

	languageOptions: {
		/**
		 * Config originally set browser + node globals. FlatConfig standard is to
		 * not set globals, and have end users configure them themselves.
		 * {@see https://eslint.org/blog/2022/08/new-config-system-part-2/#goodbye-environments%2C-hello-globals}
		 */
		globals: { ...globals.browser, ...globals.node },
		/**
		 * Legacy `eslint-config-next` uses custom Next.js parser + parserOptions
		 * with Babel by default, and sets parser '@typescript-eslint/parser` for
		 * .ts, .tsx files. This is not possible in one config with FlatConfig, and
		 * doing that would result in conflicts between the two parsers.
		 */
		parserOptions: {
			ecmaFeatures: {
				jsx: true, // set true by eslint-plugin-react's recommended config
			},
		},
	},
	settings: {
		react: {
			version: "detect",
		},
		// Settings for eslint-plugin-import, may be better to use the
		// React/TypeScript eslint-plugin-import configs instead
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
