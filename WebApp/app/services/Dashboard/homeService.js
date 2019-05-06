// <copyright company="nhantinsoft.vn">
// Author: NTS-TUNGNT
// Created Date: 09/08/2016 15:08
// </copyright>
'use strict';
(function () {
    angular.module('app').factory('HomeService', HomeService);
    HomeService.$inject = ['$http', '$q', 'ngAuthSettings'];

    function HomeService($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var HomeServiceFactory = {
            StatisticsAmountInOut: statisticAmountInOut, 
        };

        return HomeServiceFactory;

        //Tìm kiếm
        function statisticAmountInOut() {
            var deferred = $q.defer();
            var url = serviceBase + 'api/PMSAHM1000/StatisticsAmountInOut';
            $http.post(url, JSON.stringify(), { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
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