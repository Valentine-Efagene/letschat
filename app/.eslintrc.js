module.exports = {
  ignorePatterns: ['**/*.cy.js', '**/*.php'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['off', 'never'],
    'no-extra-semi': 'off',
    'no-unused-vars': ['warn'],
    indent: [
      'warn',
      2,
      {
        ignoredNodes: ['ObjectExpression', 'SwitchCase', 'Identifier'],
      },
    ],
  },
  globals: {
    route: 'readonly',
    require: 'readonly',
    Cypress: 'readonly',
    __dirname: 'readonly',
    module: 'readonly',
  },
};
