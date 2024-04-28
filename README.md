# eslint-config-next-flat

[![GitHub Actions badge][github-actions-badge]][github-actions]
[![License][license-badge]](LICENSE)
[![License][npm-version-badge]][npm-package]

Flat config port of the Next.js ESLint config [`eslint-config-next`](https://www.npmjs.com/package/eslint-config-next).

## Installation

```bash
npm install -D eslint eslint-config-next-flat   # npm
yarn add -D eslint eslint-config-next-flat      # yarn
pnpm install -D eslint eslint-config-next-flat  # pnpm
```

Create an `eslint.config.js` file in the root of your Next.js project and add the following:

```js
const js = require("@eslint/js");
const next = require("eslint-config-next-flat");

/** @type {import('eslint').Linter.FlatConfig}[] */
module.exports = [
  { ignore: [".next"] }, // Change if `distDir` in Next.js config is different
  js.configs.recommended,
  next,
];
```

If not using TypeScript, add custom Next.js Babel parser from `"next/dist/compiled/babel/eslint-parser"`. Otherwise, for TypeScript, use [`typescript-eslint`](https://typescript-eslint.io/getting-started/).

```js
const js = require("@eslint/js");
const next = require("eslint-config-next-flat");
const parser = require("next/dist/compiled/babel/eslint-parser");

/** @type {import('eslint').Linter.FlatConfig}[] */
module.exports = [
  { ignore: [".next"] }, // Change if `distDir` in Next.js config is different
  js.configs.recommended,
  next,
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      parser,
      parserOptions: {
        requireConfigFile: false,
        sourceType: "module",
        allowImportExportEverywhere: true,
        babelOptions: {
          presets: ["next/babel"],
          caller: {
            supportsTopLevelAwait: true,
          },
        },
      },
    },
  },
];
```

## License

`next-config-next-flat` is licensed under the [MIT license](LICENSE).

<!-- Badges -->

[github-actions-badge]: https://github.com/jeremy-code/eslint-config-next-flat/actions/workflows/ci.yml/badge.svg
[github-actions]: https://github.com/jeremy-code/eslint-config-next-flat/actions/workflows/ci.yml
[license-badge]: https://img.shields.io/github/license/jeremy-code/eslint-config-next-flat
[npm-version-badge]: https://img.shields.io/npm/v/eslint-config-next-flat
[npm-package]: https://npmjs.com/package/eslint-config-next-flat
