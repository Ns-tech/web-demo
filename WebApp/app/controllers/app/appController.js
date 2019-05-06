'use strict';
app.controller('appController', ['$scope', '$location', 'authService', '$uibModal', 'notify', 'ngAuthSettings', 'common', '$cookies', 'Constant', '$state','Version',
function ($scope, $location, authService, $uibModal, notify, ngAuthSettings, common, $cookies, Constant, $state, Version) {
    $scope.FromId = 'mchm1000';
    $scope.$state = $state;
    $scope.logOut = function () {
        authService.logOut();
        $location.path('/login');
    }
    $scope.serviceBase = ngAuthSettings.apiServiceBaseUri;
    $scope.authentication = authService.authentication;
    $scope.NoImage = common.NoImage;
    $scope.NoAvatar = common.NoAvatar;
    $scope.UserName = authService.authentication.userName;

    $scope.FnChangePassword = fnChangePassword;
    $scope.FnUserProfiles = fnUserProfiles;

    $scope.CheckPermisstion = fnCheckPermisstion;
    $scope.currentLang = 'VI';

    $scope.changeLanguage = function () {
        var json = {
            LANG_CURRENT: $scope.currentLang
        };
        $scope.currentLang = $scope.currentLang == 'VI' ? 'US' : 'VI';
        $cookies.put(Constant.NTS_COOKIE_KEY, angular.toJson(json));
        // $state.reload();

        $scope.$broadcast('change-language');
    }

    setLanguage();
    function setLanguage() {
        if (authService.authentication.doctorLocation && angular.equals(authService.authentication.doctorLocation, 'US')) {
            $scope.changeLanguage('US');
        }
        else {
            $scope.changeLanguage('VI');
        }


    }

    function fnChangePassword() {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/views/pmsast/pmsast3300.html' + Version.PMSAST,
            controller: 'PMSAST3300Ctrl',
            controllerAs: 'vmModal',
            windowClass: 'app-modal-window-select-create',
            resolve: {
                deps: ['$ocLazyLoad',
                    function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'app/controllers/pmsast/pmsast3300Controller.js' + Version.PMSAST,
                            'app/services/pmsast/pmsast3300Service.js' + Version.PMSAST
                        ])
                    }
                ]
            }
        });
        modalInstance.result.then(function (rs) {
            if (rs) {
                notify('Thay đổi mật khẩu thành công');
                authService.logOut();
                $location.path('/login');
            }
        }, function () {
        });
    }
    function fnUserProfiles() {
        //var modalInstance = $uibModal.open({
        //    templateUrl: 'app/views/TRC1500InformationUserUpdateView.html',
        //    controller: 'InformationUserUpdateCtrl',
        //    controllerAs: 'vmModal',
        //    windowClass: 'app-modal-window-select-create',
        //    resolve: {
        //        deps: ['$ocLazyLoad',
        //            function ($ocLazyLoad) {
        //                return $ocLazyLoad.load([
        //                    'app/controllers/TRC1500InformationUserUpdateController.js',
        //                    'app/services/TRC1500InformationUserUpdateService.js',
        //                ]);
        //            }
        //        ], items: function () {
        //            return {};
        //        }
        //    }
        //});
        //modalInstance.result.then(function (rs) {
        //    if (rs)
        //        notify('Thay đổi thông tin cá nhân thành công');
        //}, function () {
        //});
    }

    function fnCheckPermisstion(allowFeature) {
        var isAuthorize = false;
        var allowFeatureList = allowFeature.split(';');
        var listPermission = authService.authentication.permission != null ? JSON.parse(authService.authentication.permission) : null;
        if (listPermission != null && listPermission.length > 0) {
            $.each(allowFeatureList, function (i, item) {
                $.each(listPermission, function (j, itemP) {
                    if (item.trim() == itemP) {
                        isAuthorize = true;
                    }
                });
            });
        }
        return isAuthorize;
    };

    $(document).on("click", ".profile-show", function (e) {
        if ($(this).attr('aria-expanded') == 'true') {
            $('.updown').removeClass('fa-caret-up')
                      .addClass('fa-caret-down');
        }
        else {
            $('.updown').removeClass('fa-caret-down')
                      .addClass('fa-caret-up');
        }
    });
}]);