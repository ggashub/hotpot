'use strict';

/**
 * @ngdoc function
 * @name hotpotApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hotpotApp
 */
angular.module('hotpotApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
