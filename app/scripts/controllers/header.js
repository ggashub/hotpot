'use strict';

angular.module('hotpotApp')
  .controller('HeaderCtrl', function ($scope, $rootScope, $q, myAuth, myReference, myDialog, clientConfig) {
    if (myAuth.isAuthenticated()) {
      $scope.isAuthenticated = true;
      myAuth.getAuthUser().then(function() {
        if (!myAuth.user.profile.avatarThumbUrl) {
          myAuth.user.profile.avatarThumbUrl = '/images/no-photo.png';
        } else {
          myAuth.user.profile.avatarThumbUrl = clientConfig.api.baseUrl + myAuth.user.profile.avatarThumbUrl;
        }
        $scope.user = myAuth.user;
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
      $rootScope.$on('profile:change', function(event, profile) {
        profile.avatarThumbUrl = clientConfig.api.baseUrl + profile.avatarThumbUrl + '&t=' + new Date().getTime();
        myAuth.user.profile = profile;
      });
    }
    $scope.isAuthMenuReady = true;
  });
