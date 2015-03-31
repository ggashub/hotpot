'use strict';

/**
 * @ngdoc service
 * @name hotpotApp.myConfig
 * @description
 * # myConfig
 * Service in the hotpotApp.
 */
angular.module('hotpotApp')
  .service('myConfig', function () {

    return {
      headers: ['menu', 'name', 'QPISlice', 'kbps', 'Y_psnr', 'U_psnr']
    };
  });
