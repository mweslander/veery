const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const environment = process.env.NODE_ENV || 'development';

const plugins = [
  new CleanWebpackPlugin('dist'),
  new ExtractTextPlugin('styles.css'),
  new webpack.ContextReplacementPlugin(
    /moment[\/\\]locale$/,
    /en/
  ),
  new webpack.DefinePlugin({
    'process.env': { 'NODE_ENV': JSON.stringify(environment) }
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    favicon: './favicon.ico',
    hash: environment !== 'development',
    inject: 'body',
    template: 'src/client/index.html',
    title: 'Veery | Perform Tonight'
  })
];

module.exports = {
  entry: {
    bundle: './src/client/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.s(c|a)ss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader' })
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              gifsicle: {
                interlaced: false
              },
              mozjpeg: {
                progressive: true
              },
              optipng: {
                optimizationLevel: 7
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  plugins: plugins
}
