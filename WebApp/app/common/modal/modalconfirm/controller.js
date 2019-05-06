app.controller('ConfirmCtrl', ['$scope', '$uibModalInstance', 'messagecontent', function ($scope, $modalInstance, messagecontent) {
    var vmModal = this;

    vmModal.MessageContent = messagecontent;

    vmModal.ok = function () {
        $modalInstance.close(true);
    };

    vmModal.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.$on('$locationChangeStart', function () {
        $modalInstance.dismiss('cancel');
    });
}]);