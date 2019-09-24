// --mode development
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8081,
    noInfo: true, // уберает информацию о компиляции в консоли
    // quiet: true, // уберает все сообщения в консоли, в том числе и ошибки
    overlay: {
      warnings: true,
      errors: true
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})

