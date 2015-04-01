'use strict';

angular.module('hotpotApp')
  .controller('MessageModalCtrl', function ($scope, message, type) {
    $scope.type = type;
    $scope.message = message;
  })
  .factory('myMessage', function ($modal) {
    var openModal = function(msg, type) {
      return $modal.open({
        templateUrl: 'views/message_modal.html',
        controller: 'MessageModalCtrl',
        resolve: {
          message: function() {
            return msg;
          },
          type: function() {
            return type;
          }
        }
      });

    };
    return {
      warning: function(msg) {
        openModal(msg);
      }
    };
  });
