const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  target: 'web',
  entry: path.join(__dirname, '../client/main.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.jsx'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      // {
      //   test: /\.(c|sc)ss$/,
      //   use: [
      //     'sass-loader',
      //     'css-loader',
      //     isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         ident: 'postcss',
      //         sourceMap: true,
      //         plugins: [
      //           require('autoprefixer')()
      //         ]
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.js$/,
        use: ['babel-loader', 'cache-loader'],
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
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'VUE TODO SSR DEMO',
      hash: true,
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}