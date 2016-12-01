var pathExtLibs = "../bower_components/";

require.config({
  baseUrl: ".",
  map: {
    '*': {
      'css': pathExtLibs + '/require-css/css.min'
    }
  },

  shim: {
    'app': ['angular', 'app.route', 'angular-route', 'css!/app/styles/styles'],
    'app.route': ['angular'],
    'angular-route': ['angular']
      //'flight': ['app']
  },

  // alias libraries paths
  paths: {
    'angular': [
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min',
      pathExtLibs + 'angular/angular.min'
    ],
    'angular-route': [
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-route.min',
      pathExtLibs + 'angular-route/angular-route.min'
    ],
    'app': '../app/script/app',
    'app.route': '../app/script/app.route'
      //'flight': 'components/flight/flight.component'
  },

  // kick start application
  deps: ['app']

});