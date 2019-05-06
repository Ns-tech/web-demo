'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('app', [
    'ngAnimate',
    'ngSanitize',
    'LocalStorageModule',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'perfect_scrollbar',
    'angular-inview',
    'angular-loading-bar',
    'cgNotify',
    'chart.js',
    'ngCookies',
    'ngResource',
    'ngMap'
]);

var serviceBase = "http://localhost:60007/";
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'angularjs'
});

app.constant('pageSettings', {
    recordNumbers: 10
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', 'notify', function (authService, notify) {
    authService.fillAuthData();

    notify.config({
        position: 'right'
    });
}]);

app.run(['$rootScope', 'authService', '$state', function ($rootScope, authService, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        // Do something when $state changed
        if (authService.authentication.isAuth)
            return;

        var requireLogin = toState.data.requireLogin;
        if (requireLogin == 'undefined') {
            requireLogin = false;
        }
        if (requireLogin) {
            event.preventDefault();
            $state.transitionTo('login');
        }
    });
}]);

app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
}); 
app.filter('convertPatientGender', function () {
    return function (value) {
        var Gender;
        if (value === '0') Gender= 'Nam';
        if (value === '1') Gender = 'Nữ';
      
        return Gender;
    };
});  