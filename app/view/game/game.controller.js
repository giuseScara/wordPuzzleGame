"use strict"

define(['app', 'view/start/start.service', 'css!view/start/start.style.css', 'angular'], function (app) {

  app.controller('StartController', StartController);

  StartController.$inject = ["$scope", "StartService"];

  function StartController(scope, service) {

    var vm = this;
    vm.username = null;
    vm.isDisabled = function () {
      return (vm.username == null || vm.username.trim().length == 0);
    }; //isDisabled

  }; //StartController

  return StartController;
});