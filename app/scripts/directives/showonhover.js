'use strict';

angular.module('hotpotApp')
  .directive('showOnHover', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        element.hide();
        element.parent().bind('mouseenter', function() {
          element.show();
        });
        element.parent().bind('mouseleave', function() {
          element.hide();
        });
      }
    };
  });
