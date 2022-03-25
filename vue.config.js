const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isProduction = process.env.NODE_ENV != 'development'
// 样式和js的CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {},
  // 生产环境
  build: {
    css: [
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.7/lib/theme-chalk/index.css',
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.7/lib/index.js',
    ],
  },
}
// 外部扩展，即外部引入对象与内部引用时的对象配置
// 例如：vue: 'Vue', 对应 import Vue from 'vue' 来说
// 属性名 vue 为要从外部引入时的 vue 对象，Vue为引入后的对应的全局变量。
const externals = {
  vue: 'Vue',
  vuex: 'Vuex',
  'vue-router': 'VueRouter',
  'element-ui': 'ELEMENT',
}

module.exports = {
  productionSourceMap: false,
  assetsDir: 'static',
  publicPath: './',
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "./src/assets/styles/variables";`,
  //     },
  //   },
  // },
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    open: true,
    proxy: {
      '/api': {
        // 第一个代理：此处的路径是所有接口前面相同的部分，用来匹配带有这部分路径的
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  configureWebpack: (config) => {
    const plugins = []
    if (isProduction) {
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], // 移除console
            },
          },
        })
      )
      // 服务器也要相应开启gzip
      // plugins.push(
      //   new CompressionWebpackPlugin({
      //     filename: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: /\.(js|css)?$/i,
      //     threshold: 10240,
      //     // 是否删除源码
      //     deleteOriginalAssets: false // 删除后 nginx通过 /ssr-web/ 访问会失败
      //   })
      // )
      plugins.push(
        new FileManagerPlugin({
          events: {
            onEnd: {
              archive: [{ source: './dist', destination: './dist.zip' }],
            },
          },
        })
      )
      // 自动打开分析
      if (process.argv.includes('--report')) {
        plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8881,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info',
          })
        )
      }
      // 打包时npm包转CDN
      // 外部扩展配置，在production模式下，引入外部cdn资源，同时不要把这些模块打包到libs公共包里
      config.externals = externals
    }
    return { plugins }
  },
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './path/to/resources.scss',

          // Or array of paths
          resources: ['./src/assets/commonStyle/index.scss'],
        })
        .end()
    })
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true,
      })
      .end()
    config.plugin('html').tap((args) => {
      args[0].title = 'vue2模板'
      return args
    })
    if (isProduction) {
      // 添加 cdn 参数到 htmlWebpackPlugin 配置中
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn.build
        return args
      })
    } else {
      // 添加 cdn 参数到 htmlWebpackPlugin 配置中
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn.dev
        return args
      })
    }
  },
}

// const path = require('path')
// const fs = require('fs')

// module.exports = {
//   publicPath: './',
//   productionSourceMap: false,
//   chainWebpack: config => {
//     // #拆分成多个vendor文件
//     const files = fs.readdirSync(path.resolve(__dirname, './dll'))
//     files.forEach((file, index) => {
//       if (/.*\.dll.js/.test(file)) {
//         config
//           .plugin('AddAssetHtmlWebpackPlugin' + index)
//           .use(require('add-asset-html-webpack-plugin'), [
//             {
//               filepath: path.resolve(__dirname, 'dll', file)
//             }
//           ])
//       }
//       if (/.*\.manifest.json/.test(file)) {
//         config
//           .plugin('DllReferencePlugin' + index)
//           .use(require('webpack/lib/DllReferencePlugin'), [
//             {
//               context: __dirname,
//               manifest: path.resolve(__dirname, 'dll', file)
//             }
//           ])
//       }
//     })

//     config
//       .plugin('webpack-bundle-analyzer')
//       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

//     const oneOfsMap = config.module.rule('scss').oneOfs.store
//     oneOfsMap.forEach(item => {
//       item
//         .use('sass-resources-loader')
//         .loader('sass-resources-loader')
//         .options({
//           // Provide path to the file with resources
//           resources: './path/to/resources.scss',

//           // Or array of paths
//           resources: ['./src/assets/commonStyle/index.scss']
//         })
//         .end()
//     })
//   }
// }
