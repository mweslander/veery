var webpack = require('webpack');

module.exports = {
  singleRun: true,
  frameworks: ['mocha'],
  reporters: ['mocha'],
  reports: ['dots'],
  webpack: {
    devtool: 'inline-source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react', 'stage-0']
          }
        },
        {
          test: /\.html$/,
          loader: "file?name=[name].[ext]"
        },
        {
          test: /\.s?css$/,
          loaders: ["style", "css", "sass"]
        },
        {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
          ]
        }
      ]
    }
  },
  webpackServer: {
    noInfo: true
  }
};
