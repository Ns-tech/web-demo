// <copyright company="nhantinsoft.vn">
// Author: NTS-TUNGNT
// Created Date: 09/08/2016 15:08
// </copyright>
'use strict';
app.controller('PMSACT1100Ctrl', ['$scope', '$http', 'PMSACT1100Service', '$uibModal', '$uibModalInstance', 'message', '$state', 'items', 'authService', 'ngAuthSettings', 'notify', 'common',
  function ($scope, $http, PMSACT1100Service, $uibModal, $uibModalInstance, message, $state, items, authService, ngAuthSettings, notify, common) {
      var vmModal = this;
      vmModal.serviceBase = ngAuthSettings.apiServiceBaseUri;
      vmModal.File = null;
      $scope.FileUpload = null;
      $scope.ImagePath = "";
      fnInitPage();
      vmModal.FnSave = fnSaveCustomer;
      vmModal.FnClear = fnClearData;
      vmModal.FnClose = fnCloseModal;
      vmModal.FnEdit = fnEdit;
      vmModal.ChangeAge = fnChangeAge;
      vmModal.ChangeDateOfBirth = fnChangeDateOfBirth;
      vmModal.Model = {
          listTicketMonth: [],
          listTicketRegister: [],
          listHistoryParking: [],
          listVehicle:[]
      }

      // Khởi tạo trang
      function fnInitPage() {
          fnInitialObject();
      }

      // Khởi tạo model
      function fnInitialObject() {
          fnGetCustomerInfo(items.id);
      }

      // Lưu thông tin người dùng
      function fnSaveCustomer() {
          if (vmModal.Model.DateOfBirthShow) {
              vmModal.Model.DateOfBirth = moment(vmModal.Model.DateOfBirthShow).locale('vi').format('YYYY-MM-DD');
          }

          if (items.id != undefined) {
              fnUpdateCustomer();
              vmModal.ModalTitle = "Cập nhật người dùng";
          }
          else {
              fnAddCustomer();
          }
      }

      // Thêm mới và trở về danh sách
      function fnAddCustomer() {
          vmModal.Model.CreateBy = authService.authentication.id;
         
          PMSACT1100Service.CreateCustomer(vmModal.File, vmModal.Model).then(function () {
              notify('Thêm mới khách hàng thành công!');
              fnCloseModal();
          }, function (error) {
              message.ShowMessage(error.message, 1);
          });
      }

      // Cập nhật
      function fnUpdateCustomer() {
          vmModal.Model.UpdateBy = authService.authentication.id;
         
          PMSACT1100Service.UpdateCustomer(vmModal.File, vmModal.Model).then(function () {
              notify('Cập nhật khách hàng thành công!');
              fnCloseModal();
          }, function (error) {
              message.ShowMessage(error.message, 1);
          });
      }

      // Hiển thị thông tin
      function fnGetCustomerInfo() {
          PMSACT1100Service.GetCustomerInfo(items.id).then(function (data) {
              vmModal.Model = data;
              if (vmModal.Model.DateOfBirth) {
                  vmModal.Model.DateOfBirthShow = moment(vmModal.Model.DateOfBirth).locale('vi').toDate();
              }
               // Kiểm tra hiển thị thêm mới hoặc sửa
              if (items.id != undefined) {
                  vmModal.ModalTitle = "Cập nhật thông tin khách hàng";
                  vmModal.SaveText = "Cập nhật";
                  vmModal.ShowClear = false;
                  vmModal.Model.UpdateBy = authService.authentication.UserId;
                  vmModal.ShowEdit = true;
                  vmModal.StatusEdit = false;
                  vmModal.Model.listTicketMonth = data.listTicketMonth;
                  vmModal.Model.listTicketRegister = data.listTicketRegister;
                  vmModal.Model.listHistoryParking = data.listHistoryParking;
                  vmModal.Model.listVehicle = data.listPersonalVehicle;
                  var startIndex = 0;
                  angular.forEach(vmModal.Model.listTicketMonth, function (item, index) {
                      item.index = startIndex + (index + 1);
                  });
                  angular.forEach(vmModal.Model.listTicketRegister, function (item, index) {
                      item.index = startIndex + (index + 1);
                  });
                  angular.forEach(vmModal.Model.listHistoryParking, function (item, index) {
                      item.index = startIndex + (index + 1);
                  });
                  angular.forEach(vmModal.Model.listVehicle, function (item, index) {
                      item.index = startIndex + (index + 1);
                  });
                  $scope.ImagePath = (vmModal.Model.ImagePath != "" && vmModal.Model.ImagePath != null) ? vmModal.serviceBase + vmModal.Model.ImagePath : common.NoAvatar;

              }
              else {
                  $scope.ImagePath = common.NoAvatar;
                  vmModal.ModalTitle = "Thêm mới thông tin khách hàng";
                  vmModal.SaveText = "Lưu";
                  vmModal.ShowClear = true;
                  vmModal.Model.CreateBy = authService.authentication.UserId;
                  vmModal.ShowEdit = false;
                  vmModal.StatusEdit = true;
              }
              vmModal.File = null;
          }, function (error) {
              message.ShowMessage(error.message, 1);
          });
      }

      // Hiển thị ngày sinh theo số tuổi
      function fnChangeAge() {
          if (vmModal.Model.Age) {
              var year = moment().subtract(vmModal.Model.Age, 'years').locale('vi').format('YYYY');

              vmModal.Model.DateOfBirthShow = moment(year + '-01' + '-01').locale('vi').toDate();
          }
          else {
              vmModal.Model.DateOfBirthShow = null;
          }
      }

      // Hiển thị số tuổi theo ngày sinh
      function fnChangeDateOfBirth() {
          if (vmModal.Model.DateOfBirthShow) {
              var curretDate = moment().locale('vi').toDate();

              vmModal.Model.Age = moment().locale('vi').diff(moment(vmModal.Model.DateOfBirthShow), 'year');
          }
          else {
              vmModal.Model.Age = null;
          }
      }
      // Xóa thông tin trên giao diện
      function fnClearData() {
          //Khỏi tạo lại model
          fnInitialObject();
          
      }

      // Đóng model
      function fnCloseModal() {
          $uibModalInstance.close(true);
      }

      // Xác nhận sửa
      function fnEdit() {
          vmModal.ShowEdit = false;
          vmModal.StatusEdit = true;
      }
  }
]);

app.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i], filePath: 'C:/fakepath/' + files[i].name });
                }
            });
        }
    }
});