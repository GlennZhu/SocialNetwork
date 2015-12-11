module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'lib/js/tether-1.1.1/tether.min.js',
        'lib/js/jquery-2.1.4.min.js',
        'lib/js/bootstrap.min.js',
        'lib/js/angular-1.4.7/angular.js',
        'lib/js/angular-1.4.7/angular-route.js',
        'lib/js/angular-1.4.7/angular-resource.js',
        'app/index/app.js',
        'app/controllers.js',
        'app/services/api-services.js',
        'app/directives/post-directive.js',
        'app/landing/landing-controller.js',
        'app/main/main-controller.js',
        'app/registration/registration-controller.js',
        'app/settings/settings-controller.js',
        'app/update/updateComment-controller.js',

        'lib/js/angular-1.4.7/angular-mocks.js',
        'test/spec/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.js': 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        type : 'html',
        dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
