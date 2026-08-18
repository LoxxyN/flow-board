import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  { files: ['**/*.js'], plugins: { js }, extends: ['js/recommended'] },
  ...tseslint.configs.recommended,
  prettier,
  {
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/generated/**'],
  },
])
