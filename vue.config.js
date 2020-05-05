// vue.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const path = require('path');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const IS_DEV = ['development', 'develop'].includes(process.env.NODE_ENV);

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  outputDir: './www/dist',
  productionSourceMap: !IS_PROD,
  css: {
    extract: IS_PROD, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {} // css预设器配置项
  },
  configureWebpack: config => {
    if (IS_PROD) {
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
          sourceMap: false,
          parallel: true
        })
      );
      // #region 启用GZip压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.json$|\.css/,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      // #endregion

      // #region 取消webpack警告的性能提示
      config.performance = {
        hints: 'warning',
        //入口起点的最大体积
        maxEntrypointSize: 50000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith('.js');
        }
      };
      // #endregion
    }
  },
  chainWebpack: config => {
    // #region 关闭预加载
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
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

    if (!IS_DEV) {
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

      // #region 忽略生成环境打包的文件
      var externals = {
        vue: 'Vue',
        axios: 'axios',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
        // vant: 'Vant'
      };
      config.externals(externals);
      const cdn = {
        css: [],
        js: [
          // vue
          '//cdn.myun.info/vue-2.6.11/vue.min.js',
          // vue-router
          '//cdn.myun.info/vue-router-3.1.6/vue-router.min.js',
          // vuex
          '//cdn.myun.info/vuex-3.2.0/vuex.min.js',
          // axios
          '//cdn.myun.info/axios-0.19.2/axios.min.js',
          // localforage
          '//cdn.myun.info/localforage.min.js'
          // vant
          // '//cdn.myun.info/vant-2.6.2/vant.min.js'
        ]
      };
      config.plugin('html').tap(args => {
        args[0].cdn = cdn;
        return args;
      });
      // #endregion

      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
          commons: {
            name: 'chunk-components',
            test: resolve('src/components'),
            minChunks: 3, //  被至少用三次以上打包分离
            priority: 5, // 优先级
            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
          },
          node_vendors: {
            name: 'chunk-libs',
            chunks: 'initial', // 只打包初始时依赖的第三方
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          vantUI: {
            name: 'chunk-vant', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重高，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/
          }
        }
      });
      config.optimization.runtimeChunk('single');

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
