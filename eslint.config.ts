import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import * as importPlugin from 'eslint-plugin-import';
import tseslint, { type ConfigWithExtends } from 'typescript-eslint';

const ignores: ConfigWithExtends['ignores'] = [
  '**/dist/**',
  '**/build/**',
  '**/docs/**',
  '**/node_modules/**',
  '**/**/*.d.ts'
];
const sharedExtends = [
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  prettierConfig
];
const sharedPlugins = {
  '@typescript-eslint': tseslint.plugin,
  import: importPlugin
};
const sharedSettings = {
  'import/resolver': {
    typescript: { project: './tsconfig.json' },
    node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
  }
};

const relaxedRules: ConfigWithExtends['rules'] = {
  '@typescript-eslint/no-confusing-void-expression': 'off',
  'no-duplicate-imports': 'off',
  'import/no-duplicates': 'error',
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/method-signature-style': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/unbound-method': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
  '@typescript-eslint/no-unnecessary-condition': 'off',
  '@typescript-eslint/prefer-nullish-coalescing': 'off',
  '@typescript-eslint/no-empty-function': 'off'
};
export default tseslint.config(
  {
    name: 'src',
    files: ['./src/**/*.{ts,tsx,js,jsx}'],
    ignores: [...ignores],
    plugins: sharedPlugins,
    settings: sharedSettings,
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    extends: [...sharedExtends],
    rules: { '@typescript-eslint/no-confusing-void-expression': 'off' }
  },
  {
    name: 'tests',
    files: ['./__tests__/**/*.{ts,tsx,js,jsx}'],
    ignores: [...ignores],
    plugins: sharedPlugins,
    settings: sharedSettings,
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.test.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: relaxedRules,
    extends: [...sharedExtends]
  },
  {
    name: 'configs',
    files: ['./*.ts'],
    ignores: [...ignores],
    plugins: sharedPlugins,
    settings: sharedSettings,
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.config.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: relaxedRules
  }
);
