const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  // entry: path.join(__dirname, '../client/main.js'),
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: 'http://127.0.0.1:8000/'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'static/images/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
