import js from '@eslint/js';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    rules: {},
  },
  {
    ignores: ['dist', 'node_modules'],
  },
];
