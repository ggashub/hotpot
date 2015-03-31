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
        $scope.headers = myConfig.headers;
        $scope.references = references.plain();
        $scope.updateReference = function(refIndex) {
          references[refIndex].save();
        };
        $scope.addReferenceData = function($data, refIndex, header) {
          if (!references[refIndex][header]) {
            references[refIndex][header] = [];
            $scope.references = references.plain();
          }
          references[refIndex][header].push($data);

          references[refIndex].save();
        };
      });
    }
  })
  .filter('capitalize', function() {
    return function(input) {
      return input.charAt(0).toUpperCase() + input.substr(1);
    };
  });
