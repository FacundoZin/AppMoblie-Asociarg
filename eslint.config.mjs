import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactNative from 'eslint-plugin-react-native';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['node_modules/**', '.expo/**', 'dist/**', 'android/**', 'ios/**', 'babel.config.js'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-native': reactNative,
    },
    rules: {
      // TypeScript already checks these; the base rules conflict with the TS versions.
      'no-unused-vars': 'off',
      'no-undef': 'off',
      // Strict TS extras already flag unused code; keep ESLint aligned with `_`-prefix convention.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'error',
    },
  },
  {
    // Ban hardcoded hex color literals in components; theme tokens are the only color source.
    // src/theme is exempt (it owns the token definitions).
    files: ['**/*.tsx'],
    ignores: ['src/theme/**'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[regex=/#[0-9a-fA-F]{3,8}/]',
          message: 'Hardcoded hex colors are not allowed; use theme tokens from src/theme.',
        },
      ],
    },
  },
  prettierConfig,
);