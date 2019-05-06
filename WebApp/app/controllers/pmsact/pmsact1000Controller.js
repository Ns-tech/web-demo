// <copyright company="nhantinsoft.vn">
// Author: NTS-TUNGNT
// Created Date: 09/08/2016 15:08
// </copyright>
'use strict';
app.controller('PMSACT1000Ctrl', ['$scope', '$http', 'PMSACT1000Service', '$uibModal', 'message', 'notify', 'Version', 'authService',
  function ($scope, $http, PMSACT1000Service, $uibModal, message, notify, Version, authService) {
      var vm = this;
      vm.ListData = [];
      vm.Total = 0;
      // Gán sự kiện
      vm.FnSearch = fnSearchCustomer;
      vm.FnClear = fnClearData;
      vm.FnDelete = fnConfirmDeleteCustomer;
      vm.FnShowCreateUpdate = fnModalCreateUpdate;
      fnInitPage();

      // Khởi tạo trang
      function fnInitPage() {
          $scope.totalItems = 0;
          $scope.currentPage = 1;
          $scope.numPerPage = 10;
          $scope.maxSize = 5;
          fnInitialModel(),
          fnSearchCustomer();
      }

      // Khởi tạo model
      function fnInitialModel() {
          vm.Model = {
              Search: '',
              pageSize: '',
              pageNumber:''
          };
      }

      // Tìm kiếm
      function fnSearchCustomer() {
          vm.Model.pageSize = $scope.numPerPage;
          vm.Model.pageNumber = $scope.currentPage;
          PMSACT1000Service.SearchCustomer(vm.Model).then(function (data) {
              vm.ListData = data.ListResult;
              $scope.totalItems = data.TotalItem;
              //Tính index bắt đầu
              var startIndex = (($scope.currentPage - 1) * $scope.numPerPage);
              angular.forEach(vm.ListData, function (item, index) {
                  item.index = startIndex + (index + 1);
              });
          }, function (error) {
              message.ShowMessage(error.message, 1);
          });
      }


      // Show modal thêm mới hoặc cập nhật
      function fnModalCreateUpdate(id) {
          var modalInstance = $uibModal.open({
              templateUrl: 'app/views/pmsact/pmsact1100.html' + Version.PMSACT,
              controller: 'PMSACT1100Ctrl',
              controllerAs: 'vmModal',
              windowClass: 'app-modal',
              resolve: {
                  deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                             'app/controllers/pmsact/pmsact1100Controller.js' + Version.PMSACT,
                             'app/services/pmsact/pmsact1100Service.js' + Version.PMSACT,
                          ]);
                      }
                  ], items: function () {
                      return { id: id };
                  }
              }
          });
          modalInstance.result.then(function (rs) {
              if (rs)
                  fnSearchCustomer();
          }, function () {
          });
      }

      // Xóa
      function fnDeleteCustomer(id) {
          var loguserId = authService.authentication.userid;
          PMSACT1000Service.DeleteCustomer(id, loguserId).then(function (data) {
              notify('Xóa khách hàng thành công!');
              fnSearchCustomer();
          }, function (error) {
              message.ShowMessage(error.message, 1);
          });
      }

      // Xác nhân xóa
      function fnConfirmDeleteCustomer(id) {
          var modalInstance = $uibModal.open({
              templateUrl: 'app/common/modal/modalconfirm/view.html',
              controller: 'ConfirmCtrl',
              controllerAs: 'vmModal',
              resolve: {
                  deps: ['uiLoad',
                                  function (uiLoad) {
                                      return uiLoad.load('app/common/modal/modalconfirm/controller.js');
                                  }
                  ], messagecontent: function () {
                      return { Content: "Bạn có chắc chắc muốn xóa khách hàng này không?" };
                  }
              }
          });
          modalInstance.result.then(function (rs) {
              if (rs) {
                  fnDeleteCustomer(id);
              }
          }, function () {
          });
      }
      
      // Làm mới tìm kiếm
      function fnClearData() {
          fnInitialModel();
          fnSearchCustomer();
      }

  }
]);