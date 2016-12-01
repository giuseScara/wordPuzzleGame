var allTestFiles = [
];
var pathExtLibs = "../bower_components/";
var TEST_REGEXP = /(spec|test)\.js$/i

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    //  var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '')
    allTestFiles.push(file)
  }
})

require.config({
  baseUrl: ".",
  map: {
    '*': {
      'css': pathExtLibs + 'require-css/css.min'
    }
  },

  shim: {
    angular: {
      exports: 'angular'
    },
    'app': ['angular', 'angular-mocks'],
    'angular-mocks': ['angular']
  },

  // alias libraries paths
  paths: {
    'angular': [
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min',
      pathExtLibs + 'angular/angular.min'
    ],
    'jquery': [
      pathExtLibs + 'jquery/dist/jquery.min'
    ],
    'app': '../app/script/app.mocks',
    'angular-mocks': '../node_modules/angular-mocks/angular-mocks'
  },

  // kick start application
  deps: allTestFiles,

  callback: window.__karma__.start

});