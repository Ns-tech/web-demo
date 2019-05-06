// <copyright company="nhantinsoft.vn">
// Author: NTS-TUNGNT
// Created Date: 09/08/2016 15:08
// </copyright>
'use strict';
(function () {
    angular.module('app').factory('PMSACT1000Service', PMSACT1000Service);
    PMSACT1000Service.$inject = ['$http', '$q', 'ngAuthSettings'];

    function PMSACT1000Service($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var PMSACT1000ServiceFactory = {
            SearchCustomer: searchCustomer,
            DeleteCustomer: deleteCustomer,
        };

        return PMSACT1000ServiceFactory;

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

        //Xóa thông tin
        function deleteCustomer(id, loguserId) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/PMSACT1000/DeleteCustomer?id=' + id + '&loguserId=' + loguserId;
            $http.post(url, { headers: { 'Content-Type': 'application/json' } })
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