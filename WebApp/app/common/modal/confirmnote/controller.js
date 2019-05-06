app.controller('ConfirmNoteCtrl', ['$scope', '$uibModalInstance', 'confirm', function ($scope, $modalInstance, confirm) {
    var vm = this;

    vm.check = true;
    vm.Confirm = confirm;

    vm.ok = function () {
        $modalInstance.close(vm.Confirm);
    };

    vm.cancel = function () {
        $modalInstance.close(false);
    };

    $scope.$on('$locationChangeStart', function () {
        $modalInstance.close(false);
    });
}]);