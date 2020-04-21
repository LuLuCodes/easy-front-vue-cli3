// vue.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // options for the PWA plugin.
  // see => https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
  productionSourceMap: process.env.NODE_ENV !== 'production',
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
    // #region 关闭预加载
    // config.plugins.delete('prefetch');
    // config.plugins.delete('preload');
    // #endregion 关闭预加载

    config.resolve.alias
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'));

    config.output.filename('[name].[hash].js').end();
    // #region svg-config
    // const svgRule = config.module.rule('svg'); // 找到svg-loader
    // svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
    // svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
    // svgRule // 添加svg新的loader处理
    //   .test(/\.svg$/)
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   });

    // // 修改images loader 添加svg处理
    // const imagesRule = config.module.rule('images');
    // imagesRule.exclude.add(path.resolve('src/assets/icons'));
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
          'https://cdn.myun.info/vue-2.6.11/vue.min.js',
          // vue-router
          'https://cdn.myun.info/vue-router-3.1.6/vue-router.min.js',
          // vuex
          'https://cdn.myun.info/vuex-3.2.0/vuex.min.js',
          // axios
          'https://cdn.myun.info/axios-0.19.2/axios.min.js',
          // localforage
          'https://cdn.myun.info/localforage.min.js'
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
    watchOptions: {
      aggregateTimeout: 5000,
      poll: true,
      ignored: ['node_modules']
    }, // 如果在docker开发环境下运行，请开启此项
    port: 8080, // 端口号
    // host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true // 配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // historyApiFallback: true // 如果采用history模式，开发时请开启此项
  }
};
