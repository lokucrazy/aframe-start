const webpack = require('webpack')
const path = require('path')
const resolve = require('path').resolve
const build = resolve(__dirname, 'build')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.ts',
  },
  
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    stats: 'errors-only',
    noInfo: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
      minSize: 2,
    }
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      quiet: true
    }),

    new CopyWebpackPlugin([
      { 
        from: 'src/index.html', 
        to: 'index.html' 
      },
    ]),

    new OpenBrowserPlugin({
      url: 'http://localhost:3000/'
    }),
  ],

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    path: build,
    filename: '[name].bundle.js',
  },
};