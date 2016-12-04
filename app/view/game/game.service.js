"use strict";

define(['app'], function (app) {
  app.factory("GameService", GameService);
  GameService.$inject = ["$http"];

  function GameService() {
    return {
      getWordsList: getWordsList
    };

    function getWordsList() {
      var wordsList = [
        {
          word: "word1",
          score: 0
        }, {
          word: "word2",
          score: 0
        }, {
          word: "word3",
          score: 0
        }
      ];
      wordsList.forEach(function (item) {
        item.score = setWordScore(item.word);
      });
      return wordsList;
    }; //getWordsList

    function setWordScore(word) {
      var n = word.length;
      var score = Math.floor(Math.pow(1.95, (n / 3)));
      return score;
    }; //setWordScore


  }; //GameService
});