# @jasonkuhrt/config-presets

One strict policy for Effect TypeScript projects run on Bun, as three presets: a tsconfig, an Oxlint config and an Oxfmt config. A project extends them and keeps only what is its own: the files it includes, its build output, and overrides for its own files.

## Install

```sh
bun add -d @jasonkuhrt/config-presets @effect/tsgo@0.67.5 @types/bun oxfmt@0.77.0 oxlint@1.92.0 tsrs@0.23.0-ts7.1.0-beta
```

The presets are written for these exact tool versions, which the package declares as peer dependencies.

The type check runs on Effect's build of tsrs, which reports the Effect diagnostics the tsconfig sets. Swap it in after every install:

```json
{
  "scripts": {
    "postinstall": "effect-tsgo patch --typescript=false --tsrs",
    "check:types": "tsrs --noEmit --fast",
    "check:lint": "oxlint",
    "check:format": "oxfmt --check"
  }
}
```

## `@jasonkuhrt/config-presets/tsconfig`

[@tsconfig/strictest](https://github.com/tsconfig/bases), Bun's types, and the `@effect/language-service` plugin with every Effect diagnostic set to error except the few it turns off by design.

```jsonc
// tsconfig.json
{
  "extends": "@jasonkuhrt/config-presets/tsconfig",
  "include": ["src", "tests", "*.config.ts"],
}
```

## `@jasonkuhrt/config-presets/oxlint`

Every Oxlint category at error, type-aware, with warnings denied. Each rule that is off says why beside it.

```ts
// oxlint.config.ts
export { default } from '@jasonkuhrt/config-presets/oxlint';
```

To add the project's own ignores or overrides, spread the preset and extend its arrays:

```ts
// oxlint.config.ts
import { defineConfig } from 'oxlint';
import preset from '@jasonkuhrt/config-presets/oxlint';

export default defineConfig({
  ...preset,
  ignorePatterns: [...preset.ignorePatterns, '**/build/**'],
});
```

## `@jasonkuhrt/config-presets/oxfmt`

```ts
// oxfmt.config.ts
export { default } from '@jasonkuhrt/config-presets/oxfmt';
```

The same spread adds the project's own ignores:

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt';
import preset from '@jasonkuhrt/config-presets/oxfmt';

export default defineConfig({
  ...preset,
  ignorePatterns: [...preset.ignorePatterns, 'build'],
});
```
