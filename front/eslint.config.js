import pluginVitest from '@vitest/eslint-plugin';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginCypress from 'eslint-plugin-cypress/flat';
import pluginImport from 'eslint-plugin-import';
import pluginVue from 'eslint-plugin-vue';

const INLINE_ELEMENTS = [
  'a',
  'abbr',
  'acronym',
  'b',
  'bdo',
  'big',
  'br',
  'button',
  'cite',
  'code',
  'dfn',
  'em',
  'i',
  'img',
  'input',
  'kbd',
  'label',
  'map',
  'object',
  'output',
  'q',
  'samp',
  'script',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'time',
  'tt',
  'var',
];

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },

  {
    plugins: {
      import: pluginImport,
      vue: pluginVue,
    },
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'space-before-function-paren': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: true,
        },
      ],
      'vue/singleline-html-element-content-newline': [
        'error',
        {
          ignoreWhenNoAttributes: false,
          ignoreWhenEmpty: true,
          ignores: ['pre', 'textarea', ...INLINE_ELEMENTS],
        },
      ],
      'vue/multiline-html-element-content-newline': [
        'error',
        {
          ignoreWhenEmpty: true,
          ignores: ['pre', 'textarea', ...INLINE_ELEMENTS],
          allowEmptyLines: false,
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: 1,
          multiline: 1,
        },
      ],
      'vue/html-indent': ['error', 2],
    },
  },
];
