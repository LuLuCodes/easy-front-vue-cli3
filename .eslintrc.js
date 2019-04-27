module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'arrow-parens': 'off',
    'generator-star-spacing': 'off',
    'semi': ['error', 'always'],
    'indent': 'off',
    'space-before-function-paren': 'off',
    'new-cap': 'off',
    'eol-last': 'off',
    'no-multiple-empty-lines': [1, { max: 2 }],
    'camelcase': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
