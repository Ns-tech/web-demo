'use strict';
app.controller('HomeCtrl', ['$scope', '$http', 'HomeService', 'NgMap', '$uibModal', 'message', 'notify', 'Version', '$timeout', 'ngAuthSettings',
    function ($scope, $http, HomeService, NgMap, $uibModal, message, notify, Version, $timeout, ngAuthSettings) {
      var vm = this;
      vm.ApiUrl = ngAuthSettings.apiServiceBaseUri;
      

  }

]);