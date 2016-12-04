"use strict";

define(['app', 'firebase'], function (app) {
  app.factory("GameService", GameService);
  GameService.$inject = ["$http"];

  function GameService() {
    return {
      getWordsList: getWordsList
    };

    function getWordsList(callbackFn) {

      // Set the configuration for your app
      // TODO: Replace with your project's config object
      var config = {
        databaseURL: "https://word-puzzle-game-535b6.firebaseio.com"
      };
      firebase.initializeApp(config);

      // Get a reference to the database service
      var database = firebase.database();
      firebase.database().ref('users').set({
        username: "a",
        email: "v",
        profile_picture: "v"
      });

      firebase.database().ref('/words').once('value').then(function (snapshot) {
        var wordsList = snapshot.val();
        wordsList.forEach(function (item) {
          item.score = setWordScore(item.word);
        });
        callbackFn(wordsList);
      });

    }; //getWordsList

    function setWordScore(word) {
      var n = word.length;
      var score = Math.floor(Math.pow(1.95, (n / 3)));
      return score;
    }; //setWordScore


  }; //GameService
});
