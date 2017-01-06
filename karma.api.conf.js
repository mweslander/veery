var karmaConfig = require('./karma.conf');

var karmaApiConfig = Object.assign(karmaConfig, {
  files: ['tests.api.webpack.js'],
  preprocessors: {
    'tests.api.webpack.js': ['webpack', 'sourcemap']
  }
});

module.exports = function(config) {
  config.set(karmaApiConfig);
}
