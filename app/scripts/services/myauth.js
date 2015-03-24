'use strict';

/**
 * @ngdoc service
 * @name hotpotApp.myAuth
 * @description
 * # myAuth
 * Factory in the hotpotApp.
 */
angular.module('hotpotApp')
  .factory('myAuth', function ($q, $localStorage, $window, $timeout, Restangular) {
    var auth = Restangular.all('auth');

    // Public API here
    return {
      isAuthenticated: function () {
        if (!this.token && $localStorage.token) {
          this.token = $localStorage.token;
        }
        return this.token ? true : false;
      },
      getAuthUser: function() {
        if (this.user) {
          return $q.when(this.user);
        }
        var me = this;
        return auth.getList().then(function(auth) {
          me.user = auth[0];
          return me.user;
        }, function(error) {
          console.log(error);
          me.logout();
        });
      },
      login: function (email, password) {
        var me = this;

        return auth.post({email:email, password:password}).then(function(user){
          me.user = user;
          me.token = $localStorage.token = user.id;
        });
      },
      loginFB: function (accessToken) {
        var me = this;
        return auth.post({accessToken: accessToken, type:'FB'}).then(function(res) {
          me.user = res.data;
        });
      },
      logout: function () {
        $localStorage.$reset();
        this.user = null;
        $timeout(function() {
          $window.location.href = '/login';
        }, 100);
      }
    };
  });
