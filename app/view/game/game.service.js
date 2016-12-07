"use strict";

define(['app', 'data.access.service'], function (app) {
  app.factory("GameService", GameService);
  GameService.$inject = ["DataAccessService"];

  function GameService(DataAccessService) {

    return {
      getWordsList: getWordsList,
      saveScore: saveScore
    };

    function getWordsList(callbackFn) {
      DataAccessService.getData('words', function (snapshot) {
        var wordsList = snapshot.val();
        wordsList.forEach(function (item) {
          item.score = setWordScore(item.word);
        });
        wordsList.sort(function () {
          return 0.5 - Math.random();
        });
        callbackFn(wordsList);
      });
    }; //getWordsList

    function saveScore(username, score) {
      DataAccessService.saveData("scores", {
        total: score,
        user: username
      });
    }; //saveScore

    function setWordScore(word) {
      var n = word.length;
      var score = Math.floor(Math.pow(1.95, (n / 3)));
      return score;
    }; //setWordScore


  }; //GameService
});
