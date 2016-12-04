"use strict"

define(['app', 'view/game/game.service', 'css!view/game/game.style.css', 'angular'], function (app) {

  app.controller('GameController', GameController);

  GameController.$inject = ["$scope", "$routeParams", "GameService"];

  function GameController(scope, routeParams, service) {
    var usename = routeParams["username"];
    var wordsList = service.getWordsList();
    var indexWord = 0;
    var vm = this;
    vm.countdown = null;
    vm.wordsList = wordsList;
    vm.username = usename;
    vm.userWord = null;
    vm.gameEnded = false;
    vm.wordToGuess = wordsList[indexWord].word;
    vm.wordShuffled = shuffleWord(vm.wordToGuess);

    vm.checkAnwser = function () {
      if (vm.userWord.trim().toLowerCase() === vm.wordToGuess.trim().toLowerCase()) {
        indexWord++;
        if (indexWord < wordsList.length) {
          vm.wordToGuess = wordsList[indexWord].word;
          vm.wordShuffled = shuffleWord(vm.wordToGuess);
          vm.userWord = null;
        } else {
          vm.gameEnded = true;
        }
      }
    }; //checkAnwser

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
