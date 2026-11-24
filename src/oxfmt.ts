import { defineConfig } from 'oxfmt';

/**
 * @description Formatting for Effect TypeScript projects, written for Oxfmt
 * 0.77.0.
 *
 * Use it as the whole config (`export { default } from
 * '@jasonkuhrt/config-presets/oxfmt'`) or spread it and extend `ignorePatterns`
 * with the repository's own.
 */
const preset = defineConfig({
  bracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  printWidth: 80,
  jsdoc: {
    // A tag keeps the spelling its author wrote: `@category` is lowercase, as
    // in Effect, and the formatter would otherwise capitalize it.
    capitalizeDescriptions: false,
    commentLineStrategy: 'multiline',
    descriptionTag: true,
    descriptionWithDot: true,
    preferCodeFences: true,
    separateTagGroups: false,
  },
  sortPackageJson: { sortScripts: true },
  sortImports: {
    // The author's own packages sort with a repository's internal imports.
    internalPattern: ['@jasonkuhrt/'],
    newlinesBetween: false,
  },
  ignorePatterns: [
    'node_modules',
    'coverage',
    '**/*.tsbuildinfo',
    'bun.lock',
    // Agent settings and session state, owned by the agent harnesses.
    '.claude/**',
    '.codex/**',
    // Written by git-agent, which owns the block.
    '**/CLAUDE.local.md',
  ],
});

export default preset;
