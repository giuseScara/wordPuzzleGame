"use strict";

define(['app', 'firebase'], function (app) {
  app.factory("DataAccessService", DataAccessService);
  DataAccessService.$inject = [];

  function DataAccessService() {

    var config = {
      databaseURL: "https://word-puzzle-game-535b6.firebaseio.com"
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    return {
      getData: getData,
      saveData: saveData
    };

    function getData(table, callback) {

      firebase.database().ref("/" + table).once('value').then(function (snapshot) {
        callback(snapshot);
      });

    }; //getData

    function saveData(table, object) {
      firebase.database().ref("/" + table).push(object);
    }; //saveData

  }; //DataAccessService
});