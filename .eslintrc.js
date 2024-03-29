module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    '@lacussoft',
  ],
  ignorePatterns: [],
  plugins: [
    '@typescript-eslint',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'class-methods-use-this': 'off',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-console': 'off',
    'object-curly-newline': 'off',
  },
}
