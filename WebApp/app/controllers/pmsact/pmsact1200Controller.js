/**
* <copyright company="nhantinsoft.vn">
* Author: NTS-TUNGNT
* Created Date: 20/09/2016 23:00
* </copyright>
*/
(function () {
    'use strict';

    angular.module('app').controller('PMSACT1200Ctrl', ['$scope', '$uibModal', '$uibModalInstance', 'PMSACT1200Service', 'message', 'authService', 'ngAuthSettings',
        function ($scope, $uibModal, $uibModalInstance, PMSACT1200Service, message, authService, ngAuthSettings) {
            var vm = this;
            vm.ListCustomer = [];
            vm.CustomerSelected = null;
            vm.ModelSearch = null;
            vm.IndexSelected = null;

            vm.FnChoose = fnChoose;
            vm.FnClose = fnClose;
            vm.FnCheckRowEvent = fnCheckRowEvent;
            vm.FnGetCustomers = fnGetCustomers;

            fnInitPage();

            function fnInitPage() {
                $scope.totalItems = 0;
                $scope.currentPage = 1;
                $scope.numPerPage = 10;
                $scope.maxSize = 5;
                fnInitModel();
                fnGetCustomers();
            }

            function fnInitModel() {
                vm.Model = {
                    Search: '',
                    pageSize: '',
                    pageNumber: ''
                };
            }

            function fnGetCustomers() {
                vm.Model.pageSize = $scope.numPerPage;
                vm.Model.pageNumber = $scope.currentPage
                PMSACT1200Service.SearchCustomer(vm.Model).then(function (data) {
                    vm.ListCustomer = data.ListResult;
                    $scope.totalItems = data.TotalItem;
                    //Tính index bắt đầu
                    var startIndex = (($scope.currentPage - 1) * $scope.numPerPage);
                    angular.forEach(vm.ListCustomer, function (item, index) {
                        item.index = startIndex + (index + 1);
                    });
                }, function (error) {
                    message.ShowMessage(error.message, 1);
                });
            }

            function fnCheckRowEvent(index) {
                vm.IndexSelected = index;
                vm.CustomerSelected = vm.ListCustomer[vm.IndexSelected];
                angular.forEach(vm.ListCustomer, function (item, index) {
                    item.Checked = false;
                });

                vm.CustomerSelected.Checked = true;
            }
            function fnChoose() {

                var listSelect = vm.ListCustomer.filter(function (em) {
                    if (em.Checked) {
                        return em
                    }
                })

                if (listSelect.length <= 0) {
                    message.ShowMessage('Chưa có người dùng nào được chọn', 1);
                }

                $uibModalInstance.close(listSelect);
            }

            function fnClose() {
                $uibModalInstance.close(false);
            }


        }]);

})();