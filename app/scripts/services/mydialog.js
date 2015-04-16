'use strict';

angular.module('hotpotApp')
  .controller('CreateReferenceDialogCtrl', function($scope, $modalInstance, myReference) {
    $scope.form = {};
    $scope.submit = function () {
      myReference.createReference($scope.form.name);
      $modalInstance.close();
    };
  })
  .controller('SettingsDialogCtrl', function($scope, $modalInstance, $window, myAuth) {
    var settings = myAuth.getSettings();
    $scope.headers = settings.headers;
    $scope.limitOptions = [
      {id: 5, label: '5'},
      {id: 10, label: '10'},
      {id: 30, label: '30'}
    ];
    $scope.limit = settings.limit;
    $scope.submit = function() {
      myAuth.saveSettings({limit: $scope.limit}).then(function(){
        $window.location.reload();
        $modalInstance.close();
      });
    };
  })
  .controller('ProfileDialogCtrl', function($scope) {

  })
  .factory('myDialog', function ($modal) {
    return {
      createReference: function() {
        return $modal.open({
          templateUrl: 'views/modals/create_reference_dialog.html',
          controller: 'CreateReferenceDialogCtrl'
        });
      },
      settings: function() {
        return $modal.open({
          templateUrl: 'views/modals/settings_dialog.html',
          controller: 'SettingsDialogCtrl'
        });
      },
      changeProfile: function() {
        return $modal.open({
          templateUrl: 'views/modals/profile_dialog.html',
          controller: 'ProfileDialogCtrl'
        });
      }
    };
  });
