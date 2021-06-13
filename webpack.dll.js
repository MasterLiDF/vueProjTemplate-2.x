const path = require('path')
const webpack = require('webpack')

module.exports = {
  // #打包成一个vendor文件 这种不用配置 vue-cli@5 默认就是这种配置。
  // #拆分成多个vendor文件
  entry: {
    vue: ['vue'],
    vuex: ['vuex'],
    axios: ['axios']
  },
  output: {
    path: path.join(__dirname, './dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, './dll/[name].manifest.json'),
      name: '[name]'
    })
  ]
}
