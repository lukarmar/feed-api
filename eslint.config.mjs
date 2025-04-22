

import tseslint from 'typescript-eslint'
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';
import eslintComments from 'eslint-plugin-eslint-comments';
import eslintUnicorn from 'eslint-plugin-unicorn';
import tseslintParser from '@typescript-eslint/parser';

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
    ],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        tsconfigRootDir: './',
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tseslintPlugin,
      "unicorn": eslintUnicorn,
      "prettier": prettier,
      "eslint-comments": eslintComments,
    },
    rules: {
      "@typescript-eslint/init-declarations": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/prefer-module": "off",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/no-empty-file": "error",
      "unicorn/no-array-reduce": "off",
      "@typescript-eslint/explicit-function-return-type" : 'off',
      "@typescript-eslint/explicit-module-boundary-types": 'off',
    },
  }
);