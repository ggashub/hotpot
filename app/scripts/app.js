'use strict';

/**
 * @ngdoc overview
 * @name hotpotApp
 * @description
 * # hotpotApp
 *
 * Main module of the application.
 */
angular
  .module('hotpotApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.bootstrap',
    'ui.router',
    'clientConfig',
    'restangular',
    'xeditable'
  ])
  .config(function ($locationProvider, $stateProvider, RestangularProvider, clientConfig) {
    //Routing
    $stateProvider
      .state('base', {
        url: '',
        templateUrl: 'views/base.html',
        abstract: true,
        resolve: {
          myAuthUser: function(myAuth) {
            return myAuth.getAuthUser();
          }
        }
      })
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          myAuthUser: function(myAuth) {
            if (myAuth.isAuthenticated()) {
              return myAuth.getAuthUser();
            } else {
              return;
            }
          }
        }
      })
      .state('base.about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('login', {
        url: '/login?redirect',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      });

    $locationProvider.html5Mode(true);

    //Set up api client
    RestangularProvider.setBaseUrl(clientConfig.api.baseUrl);
    RestangularProvider.setDefaultHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });
    RestangularProvider.setDefaultHttpFields({
      withCredentials: true
    });

    //FB
    //FacebookProvider.init('657824701014060');
  })
  .run(function($rootScope, $location, $state, myAuth, editableOptions) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      //Xeditable
      editableOptions.theme = 'bs3';

      //Any route that requires login must extend base
      if (toState.name !== 'login' && !toState.name.match(/^base\./)) {
        return;
      }

      if (myAuth.isAuthenticated()) {
        if (toState.name === 'login') {
          event.preventDefault();
          $state.go('main');
        }
      } else {
        if (toState.name !== 'login') {
          event.preventDefault();
          $state.go('login', {'redirect': $location.absUrl()});
        }
      }
    });
  });
