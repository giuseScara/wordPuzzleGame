"use strict"

define(['app', 'css!view/game/game.style.css', 'angular'], function (app) {

  app.controller('GameController', GameController);

  GameController.$inject = ["$scope", "$routeParams", "$interval", "$timeout"];

  function GameController(scope, routeParams, interval, timeout) {
    var usename = routeParams["username"];
    var wordsList = ["word1", "word2", "word3"];
    var vm = this;
    vm.countdown = null;
    vm.wordsList = wordsList;
    vm.username = usename;
    vm.splitWord = "pizza".split('');
    vm.userWord = null;
    
    vm.shuffleWord = function(word) {
      var wordShuffled = word.split('').sort(function(){
        return 0.5-Math.random();
      }).join('');
      
      if (wordShuffled === word) vm.shuffleWord(word);
      return wordShuffled;
      
    };//shuffleWord
    
    
    var deadline = new Date(Date.parse(new Date()) + 40 * 1000);
    initializeClock(deadline);
    
    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      return {
        'total': t,
        'seconds': seconds
      };
    };//getTimeRemaining

    function initializeClock(endtime) {

      function updateClock() {
        var t = getTimeRemaining(endtime);       

        if (t.total <= 0) {
          interval.cancel(timeinterval);
        }
        document.getElementById("clockdiv").querySelector('.seconds').innerHTML = ('0' + t.seconds).slice(-2);
      };//updateClock
      
      updateClock();

      var timeinterval = interval(updateClock, 1000);
      //interval.cancel(timeinterval);
      
    };//initializeClock
    
  }; //GameController

  return GameController;
});