'use strict';

angular.module('hotpotApp')
  .controller('CreateReferenceDialogCtrl', function($scope, $modalInstance, myReference) {
    $scope.form = {};
    $scope.submit = function () {
      myReference.createReference($scope.form.name);
      $modalInstance.close();
    };
  })
  .factory('myDialog', function ($modal) {
    return {
      createReference: function() {
        return $modal.open({
          templateUrl: 'views/modals/create_reference_dialog.html',
          controller: 'CreateReferenceDialogCtrl'
        });
      }
    };
  });
