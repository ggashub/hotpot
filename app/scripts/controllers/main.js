'use strict';

/**
 * @ngdoc function
 * @name hotpotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotpotApp
 */
angular.module('hotpotApp')
  .controller('MainCtrl', function ($scope, $cookies) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log($cookies);
  });
