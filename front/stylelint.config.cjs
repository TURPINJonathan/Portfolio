module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-scss',
  ],
  plugins: [
    'stylelint-scss',
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'color-no-invalid-hex': true,
    'font-family-no-duplicate-names': true,
    'function-calc-no-unspaced-operator': true,
    'string-no-newline': true,
    'unit-no-unknown': true,
    'property-no-unknown': true,
    'keyframe-declaration-no-important': true,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    'block-no-empty': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-pseudo-element-no-unknown': true,
    'media-feature-name-no-unknown': true,
    'no-invalid-double-slash-comments': true,
  },
};