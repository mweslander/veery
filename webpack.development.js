const webpack = require('webpack');
const config = require('./webpack.base');

config.devServer = {
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
};

config.devtool = 'inline-source-map';

module.exports = config;
