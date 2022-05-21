module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
  },
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
  overrides: [
    {
      files: ['*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint', 'import'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      rules: {
        'no-console': 0,
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
};
