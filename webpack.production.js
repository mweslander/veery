const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const config = require('./webpack.base');

config.bail = true;
config.devtool = 'cheap-module-source-map';

config.optimization = {
  minimize: true
};

config.profile = false;

config.plugins = config.plugins.concat([
  new BundleAnalyzerPlugin(),
  new CompressionPlugin()
]);


module.exports = config;
