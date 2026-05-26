import base from '@dimaslanjaka/eslint-base-config';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...base,
  { ignores: ['node_modules/', 'dist/', 'public/', 'themes/navy/source/js/vendor/'] },
  {
    files: ['**/*.cjs', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node
      }
    }
  }
];
