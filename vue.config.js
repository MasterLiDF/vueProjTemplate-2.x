const path = require('path')
const fs = require('fs')

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
    // #拆分成多个vendor文件
    const files = fs.readdirSync(path.resolve(__dirname, './dll'))
    files.forEach((file, index) => {
      if (/.*\.dll.js/.test(file)) {
        config
          .plugin('AddAssetHtmlWebpackPlugin' + index)
          .use(require('add-asset-html-webpack-plugin'), [
            {
              filepath: path.resolve(__dirname, 'dll', file)
            }
          ])
      }
      if (/.*\.manifest.json/.test(file)) {
        config
          .plugin('DllReferencePlugin' + index)
          .use(require('webpack/lib/DllReferencePlugin'), [
            {
              context: __dirname,
              manifest: path.resolve(__dirname, 'dll', file)
            }
          ])
      }
    })

    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './path/to/resources.scss',

          // Or array of paths
          resources: ['./src/assets/commonStyle/index.scss']
        })
        .end()
    })
  }
}
