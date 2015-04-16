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
    var apiAuth = Restangular.all('auth');
    var cachePromise;

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
        } else if (cachePromise) {
          return cachePromise;
        }
        var me = this;
        cachePromise = apiAuth.getList().then(function(auth) {
          me.user = auth[0];
          return Restangular.one('users', me.user.id).get().then(function(user){
            me.user = user;
            //Init the preferences
            if (!me.user.preference) {
              console.log('Initializing preference...');
              me.user.preference = {
                settings: {
                  limit: 5,
                  headers: ['menu', 'name', 'QPISlice', 'kbps', 'Y_psnr', 'U_psnr']
                },
                user: me.user.id
              };
              Restangular.all('preferences').post(me.user.preference).then(function(newPref){
                me.preference = newPref;
                if (newPref.id) {
                  Restangular.one('users', me.user.id).put({preference: newPref.id});
                }
              });
            } else {
              me.preference = me.user.preference;
              delete me.user.preference;
            }
            return me.user;
          });
        }, function(error) {
          console.log(error);
          me.logout();
        });

        return cachePromise;
      },
      login: function (email, password) {
        var me = this;

        return apiAuth.post({email:email, password:password}).then(function(user){
          me.user = user;
          me.token = $localStorage.token = user.id;
        });
      },
      loginFB: function (accessToken) {
        var me = this;
        return apiAuth.post({accessToken: accessToken, type:'FB'}).then(function(res) {
          me.user = res.data;
        });
      },
      logout: function () {
        $localStorage.$reset();
        this.user = null;
        $timeout(function() {
          $window.location.href = '/login';
        }, 100);
      },
      getSettings: function() {
        return this.preference.settings;
      },
      saveSettings: function(settings) {
        var me = this;
        var newSettings = {};
        console.log(me.preference.settings);
        angular.extend(newSettings, me.preference.settings, settings);
        return Restangular.one('preferences', me.preference.id).put({settings: newSettings}).then(function () {
          me.preference.settings = newSettings;
        });
      }
    };
  });
