module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-cache/dist/angular-cache.min.js',
      'src/**/*.module.js',
      'src/**/*!(module).js',
    ],

    exclude: ['src/**/*.min.js'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['babel']
    },

    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],

    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // logLevel: config.LOG_DEBUG,
    logLevel: config.LOG_INFO,

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,
    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],
    concurrency: Infinity
  });
};
