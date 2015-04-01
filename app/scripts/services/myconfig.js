'use strict';

/**
 * @ngdoc service
 * @name hotpotApp.myConfig
 * @description
 * # myConfig
 * Service in the hotpotApp.
 */
angular.module('hotpotApp')
  .factory('myPreference', function () {
    //var api = Restangular.all('preferences');

    return {
      headers: ['menu', 'name', 'QPISlice', 'kbps', 'Y_psnr', 'U_psnr']
    };
  });
