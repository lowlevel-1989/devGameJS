module.exports = function(config) {
   config.set({
      basePath: '../',
      frameworks: ['jasmine'],
      files: [
         'game/assets/js/devGameJs.min.js',
         'test/spec/**/*.js'
      ],
      browsers: ['PhantomJS'],

      reporters: ['progress', 'html', 'coverage'],
      preprocessors: { 'game/assets/js/devGameJs.min.js': ['coverage'] },

      htmlReporter: {
         outputFile:   'reports/karma/index.html',
         pageTitle:    'Pruebas unitarias.',
         subPageTitle: 'DevGameJs Game Engine'
      },

      coverageReporter: {
         type:   'html',
         dir:    'reports',
         subdir: 'coverage'
      },

      singleRun: true
   });
};
