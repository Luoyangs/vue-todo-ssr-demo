const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const VueServerRendererServerPulgin = require('vue-server-renderer/server-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(c|sc)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [
                require('autoprefixer')()
              ]
            }
          }
        ]
      }
    ]
  },
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerRendererServerPulgin()
  ]
})
