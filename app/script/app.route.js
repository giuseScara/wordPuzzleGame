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
        templateUrl: "view/start/start.html",
        controller: "StartController",
        controllerAs: 'stCtrl',
        resolve: resolveController(["view/start/start.controller"])
      })
      .when("/game/:username", {
        templateUrl: "view/game/game.html",
        controller: "GameController",
        controllerAs: 'gmCtrl',
        resolve: resolveController(["view/game/game.controller"])
      })
      .when("/description", {
        templateUrl: "view/description/description.html",
      })
      .when("/scores", {
        templateUrl: "view/scores/scores.html",
        controller: "ScoresController",
        controllerAs: 'srCtrl',
        resolve: resolveController(["view/scores/scores.controller"])
      })
      .otherwise({
        redirectTo: "/start",
      })
  }; //configRoutes
  return configRoutes;

});
