'use strict';

/**
 * @ngdoc directive
 * @name hotpotApp.directive:loginForm
 * @description
 * # loginForm
 */
angular.module('hotpotApp')
  .directive('loginForm', function ($window, myAuth, Facebook) {
    return {
      templateUrl: 'views/directives/loginform.html',
      restrict: 'E',
      link: function (scope) {
        scope.form = {};
        scope.submit = function() {
          scope.errors = [];

          if (!scope.form.email) {
            scope.errors.push('Please enter your email.');
          }

          if (!scope.form.password) {
            scope.errors.push('Please enter your password.');
          }

          if (scope.errors.length > 0) {
            return;
          }

          myAuth.login(scope.form.email, scope.form.password).then(function(){
            //$window.location.href = attrs.redirect;
          }, function(res) {
            if (res.data && res.data.errors) {
              scope.errors = res.data.errors;
            } else {
              console.log(res);
            }
          });
        };
        scope.loginFB = function() {
          Facebook.login(function(response) {
            if (response.status === 'connected') {
              myAuth.loginFB(response.authResponse);
            }
          }, {scope: 'email'});
        };
      }
    };
  });
