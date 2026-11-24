import { defineConfig } from 'oxfmt';
import preset from './src/oxfmt.ts';

export default defineConfig({
  ...preset,
  ignorePatterns: [...preset.ignorePatterns, 'build'],
});
