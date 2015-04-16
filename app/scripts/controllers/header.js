'use strict';

angular.module('hotpotApp')
  .controller('HeaderCtrl', function ($scope, $q, myAuth, myReference, myDialog) {
    if (myAuth.isAuthenticated()) {
      $scope.isAuthenticated = true;
      myAuth.getAuthUser().then(function(user) {
        $scope.user = user;
      });
      $scope.logout = function() {
        myAuth.logout();
      };
      $scope.deleteReference = function() {
        angular.forEach(myReference.references, function(ref, refIndex){
          if (ref.selected) {
            myReference.deleteReference(refIndex).then(function() {
              myReference.removeReference(refIndex);
            });
          }
        });
      };
      $scope.createReference = function() {
        myDialog.createReference();
      };
      $scope.changeSettings = function() {
        myDialog.settings();
      };
      $scope.changeMyProfile = function() {
        myDialog.changeProfile();
      };
      $scope.disableDelete = function() {
        return myReference.getSelectedCount() > 0 ? false : true;
      };
    }
    $scope.isAuthMenuReady = true;
  });
