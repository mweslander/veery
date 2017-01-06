var karmaConfig = require('./karma.conf');

var karmaClientConfig = Object.assign(karmaConfig, {
  browsers: ['Chrome'],
  files: ['tests.client.webpack.js'],
  preprocessors: {
    'tests.client.webpack.js': ['webpack', 'sourcemap']
  }
});

module.exports = function(config) {
  config.set(karmaClientConfig);
}
