import { defineConfig } from 'vitest/config';
const ROOT = import.meta.dirname;
export default defineConfig({
  cacheDir: `${ROOT}/.dev/.cache/`,
  test: {
    typecheck: { enabled: true, tsconfig: `${ROOT}/tsconfig.test.json` },
    coverage: {
      provider: 'v8',
      enabled: true,
      thresholds: { 100: true, perFile: true },
      reporter: ['text'],
      ignoreEmptyLines: true,
      reportsDirectory: `${ROOT}/.dev/.cache/vitest/.coverage`,
      exclude: [
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
        '**/docs/**',
        '**/dev/**',
        '**/node_modules/**',
        '**/__tests__/**',
        '**/[.]**',
        '**/*.d.ts',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
        '**/{vitest,build,eslint,prettier}.config.*',
        '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
        '**/.cache/**',
        '**/.github/**',
        '**/index.*',
        '**/README.*',
        '**/LICENSE*',
        '**/CHANGELOG*',
        '**/CONTRIBUTING*',
        '**/templates/**',
        '**/bin/**',
        '**/examples/**',
        '**/types.ts',
        '**/types/**',
        '*.config.*',
        './src/run.ts'
      ]
    }
  }
});
