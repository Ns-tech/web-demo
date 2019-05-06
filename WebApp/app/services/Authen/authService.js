'use strict';
app.factory('authService', ['$http', '$q', '$state', 'localStorageService', 'ngAuthSettings', '$location',
    function ($http, $q, $state, localStorageService, ngAuthSettings, $location) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var authServiceFactory = {
            logOut: _logOut,
        };

        var _authentication = {
            isAuth: false,
            userName: "",
            userFullName: "",
            useRefreshTokens: false,
            userid: "",
            authorizestring: "",
            authorizeitemsstring: "",
            permission: "",
            imageLink: "",
            id: "",
            code: "",
            unitid: "",
            level: "",
            groupid: "",
            token: "",
            doctorLocation: ""
        };

        var _login = function (loginData) {
            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&client_id=" + ngAuthSettings.clientId;

            _logOut();
            // Tao moi mot doi tuong deferred, bao gom cac phuong thuc resolve(), reject(), notify()
            // Defferred co mot thuong tinh promise 
            var deferred = $q.defer();

            $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) { 
                if (loginData.useRefreshTokens) {
                    localStorageService.set('authorizationData',
                        {
                            token: response.access_token,
                            userName: loginData.userName,
                            userid: response.userid,
                            userFullName: loginData.userfullname,
                            refreshToken: response.refresh_token,
                            useRefreshTokens: true,
                            authorizestring: response.authorizestring,
                            authorizeitemsstring: response.authorizeitemsstring,
                            permission: response.permission,
                            imageLink: response.imageLink,
                            id: response.userid,
                            code: response.code,
                            unitid: response.unitid,
                            level: response.level,
                            groupid: response.groupid,
                            doctorLocation: response.doctorLocation
                        });
                }
                else {
                    localStorageService.set('authorizationData',
                        {
                            token: response.access_token,
                            userName: response.userName,
                            userid: response.userid,
                            userFullName: response.userfullname,
                            refreshToken: "",
                            useRefreshTokens: false,
                            authorizestring: response.authorizestring,
                            authorizeitemsstring: response.authorizeitemsstring,
                            permission: response.permission,
                            imageLink: response.imageLink,
                            id: response.userid,
                            code: response.code,
                            unitid: response.unitid,
                            level: response.level,
                            groupid: response.groupid,
                            doctorLocation: response.doctorLocation
                        });
                }
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                _authentication.useRefreshTokens = loginData.useRefreshTokens;
                _authentication.permission = response.permission;
                _authentication.imageLink = response.imageLink;
                _authentication.id = response.userid;
                _authentication.code = response.code;
                _authentication.userid = response.userid;
                _authentication.unitid = response.unitid;
                _authentication.level = response.level;
                _authentication.groupid = response.groupid;
                _authentication.token = response.access_token;
                _authentication.userFullName = response.userfullname;
                _authentication.doctorLocation = response.doctorLocation;

               
                deferred.resolve(response);

            }).error(function (err, status) { 
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {
            localStorage.removeItem('firstLogin');

            localStorageService.remove('authorizationData');
            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.userid = "";
            _authentication.permission = "";
            _authentication.userFullName = "";
            _authentication.useRefreshTokens = false;
            _authentication.authorizestring = "";
            _authentication.authorizeitemsstring = "";
            _authentication.id = "";
            _authentication.code = "";
            _authentication.unitid = "";
            _authentication.level = "";
            _authentication.groupid = "";
            _authentication.doctorLocation = "";
            $state.go('login');
        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.permission = authData.permission;
                _authentication.imageLink = authData.imageLink;
                _authentication.id = authData.id;
                _authentication.code = authData.code;
                _authentication.userFullName = authData.userFullName;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
                _authentication.userid = authData.userid;
                _authentication.authorizestring = authData.authorizestring;
                _authentication.authorizeitemsstring = authData.authorizeitemsstring;
                _authentication.unitid = authData.unitid;
                _authentication.level = authData.level;
                _authentication.groupid = authData.groupid;
                _authentication.doctorLocation = authData.doctorLocation;
            }

        };

        var _refreshToken = function () {
            var deferred = $q.defer();

            var authData = localStorageService.get('authorizationData');

            if (authData) {

                if (authData.useRefreshTokens) {

                    var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                    localStorageService.remove('authorizationData');

                    $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                        localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                        deferred.resolve(response);

                    }).error(function (err, status) {
                        _logOut();
                        deferred.reject(err);
                    });
                }
            }

            return deferred.promise;
        };

        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.refreshToken = _refreshToken;

        return authServiceFactory;
    }]);