// <copyright company="nhantinsoft.vn">
// Author: NTS-TUNGNT
// Created Date: 09/08/2016 15:08
// </copyright>
'use strict';
(function () {
    angular.module('app').factory('PMSACT1100Service', PMSACT1100Service);
    PMSACT1100Service.$inject = ['$http', '$q', 'ngAuthSettings'];

    function PMSACT1100Service($http, $q, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var PMSACT1100ServiceFactory = {
            CreateCustomer: createCustomer,
            UpdateCustomer: updateCustomer,
            GetCustomerInfo: getCustomerInfo,
        };

        return PMSACT1100ServiceFactory;


        //Thêm mới
        function createCustomer(file, model) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/PMSACT1000/CreateCustomer';
            var fd = new FormData();
            fd.append('File', file);
            fd.append('Model', angular.toJson(model));
            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
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

        //Cập nhật thông tin
        function updateCustomer(file, model) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/PMSACT1000/UpdateCustomer';
            var fd = new FormData();
            fd.append('File', file);
            fd.append('Model', angular.toJson(model));
            $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
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

        //Lấy thông tin theo Id
        function getCustomerInfo(id) {
            var deferred = $q.defer();
            var url = serviceBase + 'api/PMSACT1000/GetCustomerInfo?id=' + id;
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
