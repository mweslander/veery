var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var lost = require('lost');
var webpack = require('webpack');

var environment = process.env.NODE_ENV || 'development';

var plugins = [
  new CleanWebpackPlugin(['dist']),
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
    hot: true,
    inline: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  entry: {
    'bundle.js': './src/client/index.js'
  },
  output: {
    filename: '[name]',
    path: './dist'
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!resolve-url!sass-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ]
  },
  sassLoader: {
    outputStyle: 'expanded'
  },
  postcss: function() {
    return [lost, autoprefixer];
  },
  plugins: plugins
}
