"use strict"

define(['app', 'css!app/view/start/start.style.css', 'angular'], function (app) {

  app.controller('StartController', StartController);

  StartController.$inject = ["$scope"];

  function StartController(scope) {

    var vm = this;
    vm.username = null;
    vm.isDisabled = function () {
      return (vm.username == null || vm.username.trim().length == 0);
    }; //isDisabled

  }; //StartController

  return StartController;
});