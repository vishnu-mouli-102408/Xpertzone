import baseConfig from "./packages/eslint-config/base.js";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
];
