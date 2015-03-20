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
    'ui.router',
    'restangular',
    'facebook'
  ])
  .config(function ($locationProvider, $stateProvider, RestangularProvider, FacebookProvider) {
    //Routing
    $stateProvider
      .state('base', {
        url: '',
        templateUrl: 'views/base.html',
        abstract: true,
        resolve: {
          session: function(myAuth) {
            return myAuth.init();
          }
        }
      })
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
      RestangularProvider.setBaseUrl('http://localhost:1337');
      RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      });
      RestangularProvider.setDefaultHttpFields({
        withCredentials: true
      });

    //FB
    FacebookProvider.init('657824701014060');
  })
  .run(function($rootScope, $location, $state, $cookies, myAuth) {

    console.log($cookies);
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      //Any route that requires login must extend base
      if (!toState.name.match(/^base\./)) {
        return;
      }

      if (!myAuth.isAuthenticated()) {
        event.preventDefault();
        $state.go('login', {'redirect': $location.absUrl()});
      }
    });
  });
