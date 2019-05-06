/// <reference path="map/ng-map.js" />
/// <reference path="map/ng-map.js" />
(function () {
    'use strict';

    /**
     * Config for the router
     */
    angular.module('app')
        .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'Constant', 'Version',
            function ($stateProvider, $urlRouterProvider, JQ_CONFIG, Constant, Version) {
                 
                $urlRouterProvider
                    .otherwise('/app/Trang-chu'); 

                $stateProvider
                    .state('app', {
                        //abstract: true,
                        url: '/app',
                        controller: 'appController',
                        templateUrl: 'app/views/app/app.html',
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        'app/controllers/app/appController.js'
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('login', {
                        templateUrl: 'app/views/Authen/login.html' + Version.PM,
                        url: '/Dang-nhap',
                        controller: 'loginController',
                        data: { requireLogin: false },
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        'app/controllers/Authen/loginController.js' + Version.PM
                                    ]);
                                }
                            ]
                        }
                    })
                    .state('app.home', {
                        url: '/Trang-chu',
                        data: { requireLogin: false },
                        controller: 'HomeCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'app/views/Dashboard/home.html' + Version.PM,
                        resolve: {
                            deps: ['$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        'app/controllers/Dashboard/homeController.js' + Version.PM,
                                        'app/services/Dashboard/homeService.js' + Version.PM, 
                                    ]);
                                }
                            ]
                        }
                    }) 
                ;
            }
        ]
    );
})();