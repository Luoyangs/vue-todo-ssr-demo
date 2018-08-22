const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const baseConfig = require('./webpack.config.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const posix = (filename) => path.posix.join('static', filename) 
// https://blog.csdn.net/icewfz/article/details/76640319
const isDev = process.env.NODE_ENV === 'development'

const clientConfig = {
  module: {
    rules: [
      {
        test: /\.(c|sc)ss$/,
        oneOf: [
          { // 这里匹配 `<style module>`
            resourceQuery: /module/,
            use: [
              isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: isDev ? '[path]-[name]-[hash:base64:8]' : '[hash:base64:8]',
                  camelCase: true
                }
              },
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
          },
          { // 这里匹配普通的 `<style>` 或 `<style scoped>`
            use: [
              isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'VUE TODO SSR DEMO',
      hash: true,
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}

let config

if (isDev) {
  config = merge(baseConfig, clientConfig, {
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 8000,
      host: '0.0.0.0',
      hot: true,
      overlay: {
        errors: true,
        warnings: true
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
} else {
  console.log('this is production')
  config = merge(baseConfig, clientConfig, {
    entry: {
      app: path.join(__dirname, '../client/main.js'),
      vendor: ['vue']
    },
    devtool: 'source-map',
    output: {
      path: path.join(__dirname, '../dist'),
      filename: posix('js/[name].[chunkhash].js'),
      chunkFilename: posix('js/[id].[chunkhash].js')
    },
    plugins: [
      new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
        root: path.resolve(__dirname, '../'),    // 设置root
        verbose: true
      }),
      new MiniCssExtractPlugin({
        filename: posix('css/[name].[contenthash].css'),
        chunkFilename: posix('css/[id].[contenthash].css')
      }),
      // 当文件内容发生变化时，生产文件对应的编译hash才会发生变化
      new webpack.HashedModuleIdsPlugin()
    ],
    optimization: {
      // 打包 公共文件
      splitChunks: {
        cacheGroups: {
          // node_modules内的依赖库 
          vendor: {
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            minChunks: 2, //被不同entry引用次数(import),1次的话没必要提取 
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100,
          },
          // ‘src/util’ 下的js文件 
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]utils[\\/]/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/, 
            name: "common", //生成文件名，依据output规则 
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1
          },
          // merge all the css chunk to one file
          styles: {
            name: 'styles',
            test: /\.(scss|css)$/,
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      },
      // 用来提取 entry chunk 中的 runtime部分函数，形成一个单独的文件，这部分文件不经常变换，方便做缓存。
      runtimeChunk: {
        name: 'manifest'
      },
      // NoEmitOnErrorsPlugin 废弃, 在生产环境中默认开启该插件。
      noEmitOnErrors: true
      // [new UglifyJsPlugin({...})]
    }
  })
}

module.exports = config