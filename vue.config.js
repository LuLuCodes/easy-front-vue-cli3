// vue.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
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
    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'));

    config.output.filename('[name].[hash].js').end();
    // #region svg-config
    // config.module.rules.delete('svg'); // 删除默认配置中处理svg,
    // config.module
    //   .rule('svg-sprite-loader')
    //   .test(/\.svg$/)
    //   .include
    //   .add(resolve('src/icons')) // 处理svg目录
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   });
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
          'https://cdn.myun.info/vue-2.6.10/vue.min.js',
          // vue-router
          'https://cdn.myun.info/vue-router-3.0.2/vue-router.min.js',
          // vuex
          'https://cdn.myun.info/vuex-3.1.0/vuex.min.js',
          // axios
          'https://cdn.myun.info/axios-0.18.0/axios.min.js'
        ]
      };
      config.plugin('html').tap(args => {
        args[0].cdn = cdn;
        return args;
      });
      // #endregion

      // #region 分析打包体积
      if (process.env.IS_ANALYZE) {
        config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
          {
            analyzerMode: 'static'
          }
        ]);
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
