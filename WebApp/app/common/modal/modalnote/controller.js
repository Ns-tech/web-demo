app.controller('NoteCtrl', ['$scope', '$uibModalInstance', 'note', function ($scope, $modalInstance, confirm) {
    var vm = this;

    vm.Note = {
        Content: ''
    };

    vm.ok = function () {
        $modalInstance.close(vm.Note);
    };

    vm.cancel = function () {
        $modalInstance.close(false);
    };

    $scope.$on('$locationChangeStart', function () {
        $modalInstance.close(false);
    });
}]);