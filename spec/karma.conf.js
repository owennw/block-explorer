module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'app/node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/js/**/*.js',
      'spec/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};