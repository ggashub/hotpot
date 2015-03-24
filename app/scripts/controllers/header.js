'use strict';

angular.module('hotpotApp')
  .controller('HeaderCtrl', function ($scope, myAuth) {
    if (myAuth.isAuthenticated()) {
      $scope.isAuthenticated = true;
      myAuth.getAuthUser().then(function(user) {
        $scope.user = user;
      });
      $scope.logout = function() {
        myAuth.logout();
      };
    }
    $scope.isAuthMenuReady = true;
  });
