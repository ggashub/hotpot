'use strict';

/**
 * @ngdoc function
 * @name hotpotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotpotApp
 */
angular.module('hotpotApp')
  .controller('MainCtrl', function ($scope, myAuth, myReference) {
    $scope.isAuthenticated = myAuth.isAuthenticated();
    if ($scope.isAuthenticated) {
      $scope.headers = myAuth.getSettings().headers;
      $scope.references = myReference.references;
      $scope.tests = myReference.tests;
      $scope.showDelete = false;
      $scope.updateReference = function(refIndex) {
        myReference.updateReference(refIndex);
      };
      $scope.createReferenceData = function(data, refIndex, header) {
        myReference.addReferenceData(data, refIndex, header);
        myReference.updateReference(refIndex);
      };
      $scope.deleteReferenceData = function(refIndex, header, refDataIndex) {
        myReference.removeReferenceData(refIndex, header, refDataIndex);
        myReference.updateReference(refIndex);
      };
      $scope.updateTest = function(refId) {
        myReference.updateTest(refId);
      };
      $scope.createTestData = function($data, refId, header) {
        myReference.addTestData($data, refId, header);
      };
      $scope.deleteTestData = function(refId, header, testIndex) {
        myReference.removeTestData(refId, header, testIndex);
        myReference.updateTest(refId);
      };
      $scope.loadMore = function () {
        myReference.getReferences().then(function() {
          $scope.references = myReference.references;
          $scope.tests = myReference.tests;
        });
      };
    }
  })
  .filter('capitalize', function() {
    return function(input) {
      return input.charAt(0).toUpperCase() + input.substr(1);
    };
  });
