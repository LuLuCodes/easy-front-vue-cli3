const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
];
module.exports = {
  presets: [
    '@vue/babel-preset-jsx',
    ['@vue/cli-plugin-babel/preset', { useBuiltIns: 'usage', corejs: 3 }]
  ],
  plugins
};
