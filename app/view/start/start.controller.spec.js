define(['app', './start.controller.js'], function (app) {
  describe('Unit: StartConroller', function () {

    beforeEach(module("AppModule", function ($provide) {

    }));

    var $controller;
    beforeEach(inject(function (_$controller_) {
      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
    }));

    var ResultsController,
      scope, $q, deferred;

    // Initialize the controller and a mock scope
    // spy the service to simulate the promise
    beforeEach(inject(function ($controller, $rootScope, _$q_) {
      scope = $rootScope.$new();

      scope = $rootScope.$new();
      $q = _$q_;

      // We use the $q service to create a mock instance of defer
      deferred = _$q_.defer();


      StartController = $controller('StartController', {
        $scope: scope
      });
    }));

    describe('Controller: StartController', function () {
      it('ResultsController should not be null', inject(function ($controller) {
        expect(StartController).not.toBeNull();
      }));

      it('username should be null', inject(function ($controller) {
        expect(StartController.username).toBeNull();
      }));

      it('button should be disabled', inject(function ($controller) {
        expect(StartController.isDisabled()).toBe(true);
      }));

    });
  });
});