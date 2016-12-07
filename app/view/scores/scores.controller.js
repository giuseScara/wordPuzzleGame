"use strict"

define(['app', 'view/scores/scores.service', 'angular'], function (app) {

  app.controller('ScoresController', ScoresController);

  ScoresController.$inject = ["$scope", "ScoresService"];

  function ScoresController(scope, service) {
    var vm = this;
    service.getScores(function (data) {
      vm.scores = data;
      scope.$apply();
    });
  }; //ScoresController

  return ScoresController;
});