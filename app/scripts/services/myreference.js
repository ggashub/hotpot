'use strict';

/**
 * @ngdoc service
 * @name hotpotApp.myReference
 * @description
 * # myReference
 * Service in the hotpotApp.
 */
angular.module('hotpotApp')
  .factory('myReference', function (Restangular) {
    var api = Restangular.all('references');
    /*
    var findById = function(items, id) {
      var itemIndex = false;
      angular.forEach(items, function(item, index) {
        if (item.id === id) {
          itemIndex = index;
        }
      });
      return itemIndex;
    };
    */

    return {
      getReferences: function() {
        var me = this;
        return api.getList().then(function(refs){
          me.references = refs;
          return me.references;
        });
      },
      createReference: function(name) {
        return api.post({name: name});
      },
      updateReference: function(refIndex) {
        return this.references[refIndex].save();
      },
      deleteReference: function(refIndex) {
        return this.references[refIndex].remove();
      },
      addReferenceData: function(data, refIndex, header) {
        var me = this;
        if (!me.references[refIndex][header]) {
          me.references[refIndex][header] = [];
        }
        me.references[refIndex][header].push(data);
      },
      removeReference: function(refIndex) {
        this.references.splice(refIndex, 1);
      },
      getSelectedCount: function() {
        var count = 0;
        angular.forEach(this.references, function(ref) {
          if (ref.selected) {
            count++;
          }
        });
        return count;
      }
    };
  });
