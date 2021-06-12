module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          // Provide path to the file with resources
          resources: "./path/to/resources.scss",

          // Or array of paths
          resources: ["./src/assets/commonStyle/index.scss"],
        })
        .end();
    });
  },
};
