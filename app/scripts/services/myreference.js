'use strict';

/**
 * @ngdoc service
 * @name hotpotApp.myReference
 * @description
 * # myReference
 * Service in the hotpotApp.
 */
angular.module('hotpotApp')
  .factory('myReference', function (Restangular, myAuth) {
    var apiRef = Restangular.all('references');
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
      getReferences: function(limit) {
        var me = this;
        if (!me.tests) {
          me.tests = {};
        }
        if (!me.references) {
          me.references = [];
        }
        var skip = me.references.length;
        if (!limit) {
          limit = myAuth.getSettings().limit;
        }

        return apiRef.getList({skip: skip, limit: limit, sort: 'createdAt'}).then(function(refs){
          angular.forEach(refs, function(r) {
            me.tests[r.id] = r.tests;
            delete r.tests;
          });
          me.references = me.references.concat(refs);

          return me.references;
        });
      },
      createReference: function(name) {
        var me = this;
        return apiRef.post({name: name}).then(function(newRef){
          me.addReference(newRef);
        });
      },
      addReference: function(newRef) {
        this.references.push(newRef);
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
      removeReferenceData: function(refIndex, header, index) {
        this.references[refIndex][header].splice(index, 1);
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
      },
      updateTest: function(refId) {
        var me = this;
        if (me.tests[refId]) {
          if (typeof me.tests[refId][0].put === 'undefined') {
            Restangular.one('tests', me.tests[refId][0].id).customPUT(me.tests[refId][0]).then(function(t) {
              me.tests[refId][0] = t;
            });
          } else {
            me.tests[refId][0].put();
          }
        }
      },
      createTest: function(refId) {
        var me = this;
        if (me.tests[refId] && me.tests[refId][0]) {
          var data = me.tests[refId][0];
          data.referenceId = refId;
          Restangular.all('tests').post(data);
        }
      },
      addTestData: function($data, refId, header) {
        var me = this;
        var isNew = false;
        if (me.tests[refId]) {
          if (!me.tests[refId][0]) {
            me.tests[refId][0] = {};
            isNew = true;
          }
          if (!me.tests[refId][0][header]) {
            me.tests[refId][0][header] = [];
          }
          me.tests[refId][0][header].push($data);
          if (isNew) {
            me.createTest(refId);
          } else {
            me.updateTest(refId);
          }
        }
      },
      removeTestData: function(refId, header, testIndex) {
        if (this.tests[refId]) {
          this.tests[refId][0][header].splice(testIndex, 1);
        }
      }
    };
  });
