"use strict"

define(['app', 'view/game/game.service', 'css!view/game/game.style.css', 'angular'], function (app) {

  window.humanizeDuration = require("humanize-duration");
  window.moment = require("moment");

  app.controller('GameController', GameController);

  GameController.$inject = ["$scope", "$routeParams", "GameService"];

  function GameController(scope, routeParams, service) {
    var usename = routeParams["username"];
    var indexWord = 0;
    var oldWord = "";
    var vm = this;
    vm.countdown = 40;
    vm.wordsList = null;
    vm.wordScoreToGuess = 0;
    vm.username = usename;
    vm.userWord = "";
    vm.totalScore = 0;
    vm.gameEnded = false;
    vm.wordToGuess = null;
    vm.wordShuffled = null;

    startGame();
    vm.checkAnwser = function () {
      if (vm.userWord.trim().toLowerCase() === vm.wordToGuess.trim().toLowerCase() || vm.wordsList[indexWord].score == 0) {
        vm.totalScore += vm.wordsList[indexWord].score;
        indexWord++;
        if (indexWord < vm.wordsList.length) {
          vm.wordToGuess = vm.wordsList[indexWord].word;
          vm.wordScoreToGuess = vm.wordsList[indexWord].score;
          vm.wordShuffled = shuffleWord(vm.wordToGuess);
          vm.userWord = "";
        } else {
          vm.gameEnded = true;
          service.saveScore(vm.username, vm.totalScore);
        }
      } else if (vm.userWord.length < oldWord.length) {
        if (vm.wordsList[indexWord].score > 0) {
          vm.wordsList[indexWord].score--;
          vm.wordScoreToGuess--;
        }
      }
      oldWord = vm.userWord;
    }; //checkAnwser

    vm.timerFinished = function () {
      vm.gameEnded = true;
      service.saveScore(vm.username, vm.totalScore);
      scope.$apply();
    }; //timerFinished

    vm.restart = function () {
      startGame();
    }; // restart

    function startGame() {
      angular.element(".overlay").show();

      service.getWordsList(function (data) {
        vm.wordsList = data;
        indexWord = 0;
        vm.wordToGuess = vm.wordsList[indexWord].word;
        vm.wordScoreToGuess = vm.wordsList[indexWord].score;
        vm.wordShuffled = shuffleWord(vm.wordToGuess);
        scope.$apply();
        angular.element(".overlay").hide();

      });
    }; //startGame

    function shuffleWord(word) {
      var wordShuffled = word.split('').sort(function () {
        return 0.5 - Math.random();
      }).join('');

      if (wordShuffled == word) shuffleWord(word);
      return wordShuffled;
    }; //shuffleWord

  }; //GameController

  return GameController;
});
