"use strict"

define(['app', 'view/game/game.service', 'css!view/game/game.style.css', 'angular'], function (app) {

  window.humanizeDuration = require("humanize-duration");
  window.moment = require("moment");

  app.controller('GameController', GameController);

  GameController.$inject = ["$scope", "$routeParams", "GameService"];

  function GameController(scope, routeParams, service) {
    var usename = routeParams["username"];
    var wordsList = null;
    var indexWord = 0;
    var oldWord = "";
    var vm = this;
    vm.countdown = 40;
    vm.wordsList = wordsList;
    vm.wordScoreToGuess = 0;
    vm.username = usename;
    vm.userWord = "";
    vm.totalScore = 0;
    vm.gameEnded = false;
    vm.wordToGuess = null;
    vm.wordShuffled = null;

    vm.checkAnwser = function () {
      if (vm.userWord.trim().toLowerCase() === vm.wordToGuess.trim().toLowerCase()) {
        vm.totalScore += wordsList[indexWord].score;
        indexWord++;
        if (indexWord < wordsList.length) {
          vm.wordToGuess = wordsList[indexWord].word;
          vm.wordScoreToGuess = wordsList[indexWord].score;
          vm.wordShuffled = shuffleWord(vm.wordToGuess);
          vm.userWord = "";
        } else {
          vm.gameEnded = true;
        }
      } else if (vm.userWord.length < oldWord.length) {
        if (wordsList[indexWord].score > 0) {
          wordsList[indexWord].score--;
          vm.wordScoreToGuess--;
        }
      }
      oldWord = vm.userWord;
    }; //checkAnwser

    vm.timerFinished = function () {
      vm.gameEnded = true;
      scope.$apply();
    }; //timerFinished

    service.getWordsList(function (data) {
      wordsList = data;
      vm.wordToGuess = wordsList[indexWord].word;
      vm.wordScoreToGuess = wordsList[indexWord].score;
      vm.wordShuffled = shuffleWord(vm.wordToGuess);
      scope.$apply();

    });

    function shuffleWord(word) {
      var wordShuffled = word.split('').sort(function () {
        return 0.5 - Math.random();
      }).join('');

      if (wordShuffled === word) shuffleWord(word);
      return wordShuffled;
    }; //shuffleWord

  }; //GameController

  return GameController;
});
