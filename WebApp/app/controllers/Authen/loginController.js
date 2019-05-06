// <copyright company="nhantinsoft.vn">
// Author: NTS-THANHPQ
// Created Date: 24/03/2017 17:08
// </copyright>

'use strict';
app.controller('loginController', ['$scope', '$location',  'authService', 'ngAuthSettings', 'message', function ($scope, $location, authService, ngAuthSettings, message) {
    var vm = this;
    $scope.FormId = 'pmsast3200';
    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: false,
        role: "",
        imageLink: "",
    };

    $scope.message = "";

    $scope.login = function () { 
        $location.path('/app/Trang-chu'); 
    };

    $scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authService.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/app/dashboard');

                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }
        });
    }
}]);
