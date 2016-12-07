"use strict";

define(['app', 'data.access.service'], function (app) {
  app.factory("ScoresService", ScoresService);
  ScoresService.$inject = ["DataAccessService"];

  function ScoresService(DataAccessService) {

    return {
      getScores: getScores
    };

    function getScores(callbackFn) {
      DataAccessService.getData('scores', function (snapshot) {
        callbackFn(snapshot.val());
      });
    }; //getScores

  }; //ScoresService
});