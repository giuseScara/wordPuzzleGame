var pathExtLibs = "ext_libs/";

require.config({
  baseUrl: ".",
  map: {
    '*': {
      'css': pathExtLibs + 'css.min/css.min'
    }
  },

  shim: {
    'app': ['angular', 'app.route', 'angular-route', 'angular-timer', 'css!styles/styles'],
    'app.route': ['angular'],
    'angular-route': ['angular'],
    'angular-timer': ['angular', 'moment', 'humanize-duration']
  },

  // alias libraries paths
  paths: {
    'angular': [
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min',
      pathExtLibs + 'angular.min/angular.min'
    ],
    'angular-route': [
      'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-route.min',
      pathExtLibs + 'angular-route.min/angular-route.min'
    ],
    'angular-timer': [
      'https://cdnjs.cloudflare.com/ajax/libs/angular-timer/1.3.4/angular-timer.min',
      pathExtLibs + 'angular-timer.min/angular-timer.min'
    ],
    'firebase': [
      'https://www.gstatic.com/firebasejs/3.6.1/firebase',
      pathExtLibs + 'firebase/firebase'
    ],
    'moment': pathExtLibs + 'moment.min/moment.min',
    'humanize-duration': pathExtLibs + 'humanize-duration/humanize-duration',
    'app': 'script/app',
    'app.route': 'script/app.route',
  },

  // kick start application
  deps: ['app']

});
