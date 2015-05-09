'use strict';

angular.module('hotpotApp')
  .controller('SignupCtrl', function ($scope, $state, myAuth) {
    $scope.errors = [];
    $scope.submit = function() {
      $scope.errors = [];
      if (!$scope.email) {
        $scope.errors.push('Please enter your email.');
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.email)) {
        $scope.errors.push('Invalid email.');
      }
      if (!$scope.password) {
        $scope.errors.push('Please enter your password.');
      }
      if (!$scope.firstName) {
        $scope.errors.push('Please enter your first name.');
      }
      if (!$scope.lastName) {
        $scope.errors.push('Please enter your last name.');
      }
      if ($scope.errors.length > 0) {
        return;
      }
      var data = {
        email: $scope.email,
        password: $scope.password,
        profile: {
          firstName: $scope.firstName,
          lastName: $scope.lastName
        }
      };
      myAuth.signup(data).then(function() {
        $state.go('login', {cfm: 'signup'});
      });
    };
  });
