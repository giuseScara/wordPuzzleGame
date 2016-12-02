"use strict";

define([], function () {

  configRoutes.$inject = ['$routeProvider', '$controllerProvider', '$provide', '$compileProvider', '$filterProvider'];

  function configRoutes($routeProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {

    angular.module("AppModule").controller = $controllerProvider.register;
    angular.module("AppModule").factory = $provide.factory;
    angular.module("AppModule").directive = $compileProvider.directive;
    angular.module("AppModule").filter = $filterProvider.register;
    angular.module("AppModule").factory = $provide.factory;
    angular.module("AppModule").service = $provide.service;
    angular.module("AppModule").component = $compileProvider.component;

    function resolveController(names) {
      return {
        load: ['$q', '$rootScope', function ($q, $rootScope) {
          var defer = $q.defer();
          require(names, function () {
            defer.resolve();
            $rootScope.$apply();
          });
          return defer.promise;
        }]
      }
    } //resolveController

    $routeProvider
      .when("/start", {
        templateUrl: "../app/view/start/start.html",
        controller: "StartController",
        controllerAs: 'stCtrl',
        resolve: resolveController(["../app/view/start/start.controller"])
      })
      .when("/game/:username", {
        templateUrl: "../app/view/game/game.html",
        controller: "GameController",
        controllerAs: 'gmCtrl',
        resolve: resolveController(["../app/view/game/game.controller"])
      })
      .otherwise({
        redirectTo: "/start",
      })
  }; //configRoutes
  return configRoutes;

});