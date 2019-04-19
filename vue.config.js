// vue.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true, // console
              drop_console: true,
              pure_funcs: ['console.log'] // 移除console
            }
          },
          sourceMap: true,
          parallel: true
        })
      );
    }
  },
  chainWebpack: config => {
    // #region svg-config
    const svgRule = config.module.rule('svg'); // 找到svg-loader
    svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images');
    imagesRule.exclude.add(path.resolve('src/assets/icons'));
    // #endregion svg-config

    if (process.env.NODE_ENV !== 'development') {
      // #region 图片压缩
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end();
      // #endregion

      // #region 启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(args => {});

      // #endregion

      // #region 忽略生成环境打包的文件
      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
      };
      config.externals(externals);
      const cdn = {
        css: [],
        js: [
          // vue
          'https://static.myun.info/vue-2.6.10/vue.min.js',
          // vue-router
          'https://static.myun.info/vue-router-3.0.2/vue-router.min.js',
          // vuex
          'https://static.myun.info/vuex-3.1.0/vuex.min.js',
          // axios
          'https://static.myun.info/axios-0.18.0/axios.min.js'
        ]
      };
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args;
        });
      // #endregion

      // #region 分析打包体积
      if (process.env.IS_ANALYZE) {
        config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static'
        }]);
      }
      // #endregion 分析打包体积
    }
  },
  devServer: {
    port: 8080, // 端口号
    // host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true // 配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
  }
};
