'use strict';

/**
 * @ngdoc function
 * @name hotpotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotpotApp
 */
angular.module('hotpotApp')
  .controller('MainCtrl', function ($scope, myAuth, myReference, myPreference) {
    $scope.isAuthenticated = myAuth.isAuthenticated();
    if ($scope.isAuthenticated) {
      $scope.headers = myPreference.headers;
      myReference.getReferences().then(function(references) {
        $scope.references = references;
      });
      $scope.updateReference = function(refIndex) {
        myReference.updateReference(refIndex);
      };
      $scope.createReferenceData = function($data, refIndex, header) {
        myReference.addReferenceData($data, refIndex, header);
        myReference.updateReference(refIndex);
      };
    }
  })
  .filter('capitalize', function() {
    return function(input) {
      return input.charAt(0).toUpperCase() + input.substr(1);
    };
  });
