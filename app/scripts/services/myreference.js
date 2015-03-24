'use strict';

/**
 * @ngdoc service
 * @name hotpotApp.myReference
 * @description
 * # myReference
 * Service in the hotpotApp.
 */
angular.module('hotpotApp')
  .service('myReference', function (Restangular) {
    var references = Restangular.all('references');

    return {
      getReferences: function() {
        return references.getList();
      }
    };
  });
