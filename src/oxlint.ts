import { defineConfig } from 'oxlint';

/**
 * @description A strict lint policy for Effect TypeScript projects, written for
 * Oxlint 1.92.0 with its type-aware backend.
 *
 * Every category is on at error, warnings fail the run, and an unused disable
 * directive is itself an error. A rule is off only for one of these reasons,
 * each stated beside it:
 *
 * - the compiler or an Effect diagnostic reports the same problem (one owner, one
 *   report);
 * - no code change can satisfy it in Effect code;
 * - it misreads an Effect idiom as a mistake;
 * - it prescribes a style this policy doesn't hold.
 *
 * Use it as the whole config (`export { default } from
 * '@jasonkuhrt/config-presets/oxlint'`) or spread it and extend its arrays with
 * the repository's own ignores and overrides.
 */
const preset = defineConfig({
  plugins: [
    'eslint',
    'typescript',
    'oxc',
    'import',
    'jsdoc',
    'promise',
    'node',
  ],
  categories: {
    correctness: 'error',
    suspicious: 'error',
    pedantic: 'error',
    perf: 'error',
    style: 'error',
    restriction: 'error',
    nursery: 'error',
  },
  options: {
    typeAware: true,
    denyWarnings: true,
    reportUnusedDisableDirectives: 'error',
  },
  ignorePatterns: [
    '**/node_modules/**',
    '**/coverage/**',
    '**/*.d.ts',
    '**/*.d.mts',
  ],
  rules: {
    // "made" says how a value came about, not what it is; name the value
    // itself.
    'eslint/id-denylist': ['error', 'made', 'Made'],
    'eslint/prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'array-callback-return': 'error',
    eqeqeq: 'error',
    'no-param-reassign': 'error',
    'no-useless-computed-key': 'error',
    'no-var': 'error',
    'one-var': ['error', 'never'],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // The TSDoc and Effect tags this policy's JSDoc uses.
    'jsdoc/check-tag-names': [
      'error',
      {
        definedTags: [
          'category',
          'noformat',
          'purpose',
          'typeParam',
          'remarks',
          'privateRemarks',
        ],
      },
    ],
    // Types document parameters, returns and yields; JSDoc doesn't restate them.
    'jsdoc/require-param': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/require-yields': 'off',
    'jsdoc/require-yields-type': 'off',

    // Named exports only, no `any` or non-null assertion, and type-only
    // imports and exports marked as such.
    'import/no-default-export': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-non-null-assertion': 'error',
    'typescript/consistent-type-imports': 'error',
    'typescript/consistent-type-exports': 'error',
    // Object types are interfaces, everywhere.
    'typescript/consistent-type-definitions': ['error', 'interface'],

    // Type-aware safety: no `any` flows through a call, return, assignment,
    // member access or assertion.
    'typescript/no-unnecessary-condition': 'error',
    'typescript/no-unsafe-argument': 'error',
    'typescript/no-unsafe-return': 'error',
    'typescript/no-unsafe-call': 'error',
    'typescript/no-unsafe-assignment': 'error',
    'typescript/no-unsafe-type-assertion': 'error',
    'typescript/no-unsafe-member-access': 'error',
    'typescript/no-generated-empty-object-type': 'error',
    'typescript/restrict-template-expressions': [
      'error',
      { allowAny: false, allowNever: true },
    ],
    // A function passed where a `void` callback is expected returns nothing,
    // a promise included.
    'typescript/strict-void-return': 'error',

    // Type-aware correctness.
    'typescript/no-deprecated': 'error',
    'typescript/prefer-nullish-coalescing': 'error',
    'typescript/no-unnecessary-type-assertion': 'error',
    'typescript/prefer-optional-chain': 'error',
    'typescript/no-invalid-void-type': 'error',
    'typescript/no-unnecessary-type-conversion': 'error',
    'typescript/no-confusing-void-expression': 'error',
    'typescript/return-await': ['error', 'always'],
    'typescript/use-unknown-in-catch-callback-variable': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-duplicate-type-constituents': 'error',
    'typescript/require-array-sort-compare': 'error',
    'typescript/await-thenable': 'error',
    'typescript/prefer-promise-reject-errors': 'error',
    'typescript/switch-exhaustiveness-check': [
      'error',
      { considerDefaultExhaustiveForUnions: true },
    ],
    'typescript/no-unnecessary-boolean-literal-compare': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/no-base-to-string': 'error',
    'typescript/no-redundant-type-constituents': 'error',
    'typescript/only-throw-error': 'error',
    'typescript/no-unsafe-function-type': 'error',
    'typescript/no-wrapper-object-types': 'error',
    // Index-signature properties need brackets under noPropertyAccessFromIndexSignature.
    'typescript/dot-notation': [
      'error',
      { allowIndexSignaturePropertyAccess: true },
    ],

    // One owner per check. The compiler or an Effect diagnostic reports these.
    // Effect's strictBooleanExpressions, which admits only `boolean`:
    'typescript/strict-boolean-expressions': 'off',
    // noImplicitReturns:
    'typescript/consistent-return': 'off',
    // erasableSyntaxOnly rejects enum declarations:
    'typescript/no-duplicate-enum-values': 'off',
    'typescript/prefer-enum-initializers': 'off',
    'typescript/prefer-literal-enum-member': 'off',
    'typescript/no-mixed-enums': 'off',
    'oxc/no-const-enum': 'off',
    // The type-aware copies own these:
    'eslint/prefer-promise-reject-errors': 'off',
    'eslint/no-implied-eval': 'off',
    'eslint/no-throw-literal': 'off',
    // asyncFunction, newPromise, processEnv, globalConsole bans:
    'typescript/require-await': 'off',
    'typescript/promise-function-async': 'off',
    'promise/avoid-new': 'off',
    'node/no-process-env': 'off',
    'no-console': 'off',
    // Declaration merging is legal TypeScript.
    'no-redeclare': 'off',

    // Unsatisfiable. Effect's types carry mutable Unify markers, so no
    // parameter typed with an Effect, an Option or a tagged error (itself a
    // yieldable Effect) can be deep-readonly; the rule reports every one and
    // no code change satisfies it.
    'typescript/prefer-readonly-parameter-types': 'off',
    // Effect's schemaClassMissingBrand requires a Schema class to write its
    // brand argument, `{}` for a class that is structural on purpose; this
    // rule reports that same `{}` as a redundant default. The nominal or
    // structural decision is the one kept.
    'typescript/no-unnecessary-type-arguments': 'off',

    // Off by design.
    // Effect combinators share Promise method names (Effect.catch):
    'promise/prefer-await-to-then': 'off',
    'promise/valid-params': 'off',
    // Contextual false positives on Schema and class data projection:
    'typescript/no-misused-spread': 'off',
    // A readability-neutral inversion of `text.match(pattern)`:
    'typescript/prefer-regexp-exec': 'off',
    // Noise in test assertions; Effect code has little `this`-bound OOP:
    'typescript/unbound-method': 'off',
    // Satisfying it misstates a bitwise mask of a dependency's enum as a member:
    'typescript/no-unsafe-enum-comparison': 'off',
    'typescript/no-unsafe-enum-assignment': 'off',
    // The single-signature heuristic erases real type relations:
    'typescript/no-unnecessary-type-parameters': 'off',
    // Return types are inferred, not written:
    'typescript/explicit-function-return-type': 'off',
    'typescript/explicit-module-boundary-types': 'off',
    // Generators in Effect.gen; unnecessaryEffectGen owns the empty case:
    'eslint/require-yield': 'off',
    // The compiler resolves imports and their members:
    'import/export': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',

    // Style and restriction rules whose preference this policy doesn't hold.
    'func-name-matching': 'off',
    'no-underscore-dangle': 'off',
    'require-unicode-regexp': 'off',
    'prefer-named-capture-group': 'off',
    'sort-keys': 'off',
    'id-length': 'off',
    'func-style': 'off',
    'no-null': 'off',
    'no-ternary': 'off',
    'sort-imports': 'off',
    'max-statements': 'off',
    'max-lines-per-function': 'off',
    'capitalized-comments': 'off',
    'max-lines': 'off',
    complexity: 'off',
    'no-magic-numbers': 'off',
    'prefer-destructuring': 'off',
    'branches-sharing-code': 'off',
    'no-continue': 'off',
    'no-undefined': 'off',
    'no-undef': 'off',
    curly: 'off',
    'require-await': 'off',
    'no-eq-null': 'off',
    'no-case-declarations': 'off',
    'no-else-return': 'off',
    'arrow-body-style': 'off',
    'prefer-template': 'off',
    'no-implicit-coercion': 'off',
    'func-names': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'no-void': 'off',
    'no-duplicate-imports': 'off',
    'no-plusplus': 'off',
    'no-empty-function': 'off',
    'no-inline-comments': 'off',
    'no-nested-ternary': 'off',
    'no-bitwise': 'off',
    'no-negated-condition': 'off',
    'no-await-in-loop': 'off',
    'no-loop-func': 'off',
    'no-promise-executor-return': 'off',
    'no-template-curly-in-string': 'off',
    'no-warning-comments': 'off',
    'init-declarations': 'off',
    'new-cap': 'off',
    'class-methods-use-this': 'off',
    'default-case': 'off',
    'max-classes-per-file': 'off',
    'max-params': 'off',
    'no-useless-assignment': 'off',
    'import/no-cycle': 'off',
    'import/no-namespace': 'off',
    'import/no-named-export': 'off',
    'import/prefer-default-export': 'off',
    'import/group-exports': 'off',
    'import/exports-last': 'off',
    'import/max-dependencies': 'off',
    'import/no-relative-parent-imports': 'off',
    'import/no-nodejs-modules': 'off',
    'import/consistent-type-specifier-style': 'off',
    'import/no-commonjs': 'off',
    'import/unambiguous': 'off',
    'import/no-duplicates': 'off',
    'import/no-named-as-default': 'off',
    'oxc/no-async-await': 'off',
    'oxc/no-optional-chaining': 'off',
    'oxc/no-barrel-file': 'off',
    'oxc/no-rest-spread-properties': 'off',
    'oxc/no-map-spread': 'off',
    'typescript/explicit-member-accessibility': 'off',
    'typescript/parameter-properties': 'off',
    'typescript/array-type': 'off',
    'typescript/no-require-imports': 'off',
    'typescript/method-signature-style': 'off',
    'typescript/non-nullable-type-assertion-style': 'off',
    'typescript/ban-types': 'off',
    'typescript/no-dynamic-delete': 'off',
    'typescript/no-empty-interface': 'off',
    'typescript/no-empty-object-type': 'off',
    'typescript/no-namespace': 'off',
    'typescript/consistent-indexed-object-style': 'off',
    'node/callback-return': 'off',
    'node/no-top-level-await': 'off',
    'node/no-sync': 'off',
    'promise/always-return': 'off',
    'promise/no-nesting': 'off',
    'promise/param-names': 'off',
    'promise/prefer-await-to-callbacks': 'off',
  },
  overrides: [
    {
      // The compiler reports these for TypeScript sources.
      files: ['**/*.ts', '**/*.mts', '**/*.cts'],
      rules: {
        'constructor-super': 'off',
        'getter-return': 'off',
        'no-class-assign': 'off',
        'no-const-assign': 'off',
        'no-dupe-class-members': 'off',
        'no-dupe-keys': 'off',
        'no-func-assign': 'off',
        'no-new-native-nonconstructor': 'off',
        'no-obj-calls': 'off',
        'no-this-before-super': 'off',
        'no-unreachable': 'off',
        'no-unsafe-negation': 'off',
        'no-with': 'off',
        'oxc/bad-array-method-on-arguments': 'off',
      },
    },
    {
      // Oxlint and Oxfmt read a config's default export.
      files: ['**/oxlint.config.ts', '**/oxfmt.config.ts'],
      rules: { 'import/no-default-export': 'off' },
    },
  ],
});

export default preset;
