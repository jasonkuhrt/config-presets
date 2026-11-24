import { defineConfig } from 'oxlint';
import preset from './src/oxlint.ts';

export default defineConfig({
  ...preset,
  ignorePatterns: [...preset.ignorePatterns, '**/build/**'],
  overrides: [
    ...preset.overrides,
    {
      // Each preset is its entrypoint's default export.
      files: ['src/oxlint.ts', 'src/oxfmt.ts'],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
});
