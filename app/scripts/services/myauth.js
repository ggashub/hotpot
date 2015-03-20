'use strict';

/**
 * @ngdoc service
 * @name hotpotApp.myAuth
 * @description
 * # myAuth
 * Factory in the hotpotApp.
 */
angular.module('hotpotApp')
  .factory('myAuth', function ($q, $cookies, Restangular) {
    var auth = Restangular.all('auth');

    // Public API here
    return {
      init: function () {
        var me = this;
        if (me.user === undefined) {
          return auth.getList().then(function(auth) {
            me.user = auth[0];
          });
        }

        return $q.when();
      },
      isAuthenticated: function () {
        if (this.token === undefined) {
          //this.token = $cookies.get('sails.sid');
        }
        return this.token ? true : false;
      },
      login: function (email, password) {
        var me = this;

        return auth.post({email:email, password:password}).then(function(res){
          me.user = res.data;
        });
      },
      loginFB: function (accessToken) {
        var me = this;
        return auth.post({accessToken: accessToken, type:'FB'}).then(function(res) {
          me.user = res.data;
        });
      }
    };
  });
