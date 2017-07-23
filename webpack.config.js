var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var lost = require('lost');
var path = require('path');
var webpack = require('webpack');

var environment = process.env.NODE_ENV || 'development';

var plugins = [
  new CleanWebpackPlugin('dist'),
  new webpack.DefinePlugin({
    'process.env': { 'NODE_ENV': JSON.stringify(environment) }
  }),
  new ExtractTextPlugin('styles.css'),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    hash: environment !== 'development',
    inject: 'body',
    template: 'src/client/index.html',
    title: 'Veery | Perform Tonight'
  })
];

module.exports = {
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: 'index.html' }
      ]
    },
    inline: true,
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:3000'
      }
    }
  },
  devtool: 'inline-source-map',
  entry: {
    bundle: './src/client/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader' })
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ]
  },
  plugins: plugins
}
