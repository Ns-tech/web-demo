
(function () {
    'use strict';

    angular
      .module('app')
      .factory('CookieManagementService', CookieManagementService);

    CookieManagementService.$inject = [
      'Constant',
      '$rootScope',
      '$cookies'
    ];

    function CookieManagementService(Constant, $rootScope, $cookies) {

        var CookieManagementService = {

            getCookieValue: function (key) {
                var sysInfo = $cookies.get(Constant.NTS_COOKIE_KEY);
                var sysCookieObj = sysInfo ? angular.fromJson(sysInfo) : {};
                return sysCookieObj[key];
            },

            setCookieValue: function (key, val) {
                var sysInfo = $cookies.get(Constant.NTS_COOKIE_KEY);

                var sysCookieObj = sysInfo ? angular.fromJson(sysInfo) : {};
                sysCookieObj[key] = val;
                $cookies.put(Constant.NTS_COOKIE_KEY, angular.toJson(sysCookieObj));
            }
        };

        return CookieManagementService;
    }

})();
