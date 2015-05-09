'use strict';

/**
 * @ngdoc function
 * @name hotpotApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hotpotApp
 */
angular.module('hotpotApp')
  .controller('LoginCtrl', function ($scope, $stateParams) {
    $scope.redirect = $stateParams.redirect;
    if ($stateParams.cfm === 'signup') {
      $scope.successMsg = 'Congratulations! Please login your account.'
    }
  });
