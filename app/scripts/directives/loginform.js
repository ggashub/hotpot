'use strict';

/**
 * @ngdoc directive
 * @name hotpotApp.directive:loginForm
 * @description
 * # loginForm
 */
angular.module('hotpotApp')
  .directive('loginForm', function ($window, $timeout, myAuth) {
    return {
      templateUrl: 'views/directives/loginform.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log(attrs.redirect);
        scope.successMsg = attrs.successMsg;
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
            //console.log('login redirect');
            $timeout(function() {
              $window.location.href = attrs.redirect ? attrs.redirect : '/';
            }, 100);
          }, function(res) {
            console.log(res);
            if (res.data && res.data.errors) {
              scope.errors = res.data.errors;
            } else {
              scope.errors.push('Server error.');
            }
          });
        };
        /*
        scope.loginFB = function() {
          Facebook.login(function(response) {
            if (response.status === 'connected') {
            }
          }, {scope: 'email'});
        };
        */
      }
    };
  });
