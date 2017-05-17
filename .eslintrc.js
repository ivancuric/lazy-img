'use strict';

module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  globals: {
    _: true,
  },
  plugins: ['json', 'babel', 'eslint-plugin-prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    allowImportExportEverywhere: true,
  },
  extends: 'eslint:recommended',
  rules: {
    strict: 0,
    'no-console': 0,
    'no-var': 2,
    'comma-spacing': 2,
    'no-invalid-this': 2,
    'keyword-spacing': 0,
    'comma-dangle': [2, 'always-multiline'],
    semi: 2,
    indent: [2, 2],
    'no-multiple-empty-lines': [2, { max: 2 }],
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '(^reject$|^_$|^req$)',
        varsIgnorePattern: '(^_$)',
      },
    ],
    'no-unused-expressions': [
      2,
      {
        allowShortCircuit: true,
        allowTernary: false,
      },
    ],
    'linebreak-style': [2, 'unix'],
    quotes: [1, 'single', { allowTemplateLiterals: true }],
  },
};
