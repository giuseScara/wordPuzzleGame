define(['app.route'], function (configRoutes) {
  "use strict";

  var AppModule = angular.module('AppModule', ['ngRoute', 'timer']);

  AppModule.config(configRoutes);

  AppModule.config(['$httpProvider', function ($httpProvider) {

    // alternatively, register the interceptor via an anonymous factory
    $httpProvider.interceptors.push(function ($q) {
      return {
        // optional method
        'request': function (config) {
          // do something on success
          angular.element(".overlay").show();
          return config;
        },

        // optional method
        'requestError': function (rejection) {
          // do something on error
          if (canRecover(rejection)) {
            return responseOrNewPromise
          }
          return $q.reject(rejection);
        },

        // optional method
        'response': function (response) {
          // do something on success
          angular.element(".overlay").hide();
          return response;
        },

        // optional method
        'responseError': function (rejection) {
          // do something on error
          if (canRecover(rejection)) {
            return responseOrNewPromise
          }
          return $q.reject(rejection);
        }
      };
    });
  }]);

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['AppModule']);
  });

  return AppModule;

});
