// <copyright company="nhantinsoft.vn">
// Author: NTS-TUNGNT
// Created Date: 09/08/2016 15:08
// </copyright>
'use strict';
(function () {
    angular.module('app').factory('PMSACT1200Service', PMSACT1200Service);
    PMSACT1200Service.$inject = ['$http', '$q', 'ngAuthSettings'];
    function PMSACT1200Service($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var PMSACT1200ServiceFactory = {
            SearchCustomer: searchCustomer
        };
        return PMSACT1200ServiceFactory;

        //Tìm kiếm
        function searchCustomer(model) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/PMSACT1000/SearchCustomer';
            $http.post(url, JSON.stringify(model), { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
               .success(function (response) {
                   deferred.resolve(response);
                   return response;
               })
               .error(function (errMessage, statusCode) {
                   var result = { isSuccess: false, status: statusCode, message: errMessage };
                   deferred.reject(result);
                   return result;
               });
            return deferred.promise;
        }
    }
})();