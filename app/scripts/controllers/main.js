'use strict';

/**
 * @ngdoc function
 * @name hotpotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotpotApp
 */
angular.module('hotpotApp')
  .controller('MainCtrl', function ($scope, myAuth, myReference, myConfig) {
    $scope.isAuthenticated = myAuth.isAuthenticated();
    if ($scope.isAuthenticated) {
      myReference.getReferences().then(function(references) {
        $scope.references = references.plain();
        console.log($scope.references);
        $scope.headers = myConfig.headers;
        $scope.updateReference = function($data) {
          //references[header]
        };
      });
    }
  })
  .filter('capitalize', function() {
    return function(input) {
      return input.charAt(0).toUpperCase() + input.substr(1);
    };
  });
