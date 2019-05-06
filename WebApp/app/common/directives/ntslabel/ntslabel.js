app.directive('ntsLabel', [function () {
    return {
        restrict: 'E',
        scope: {
            'formId': '=',
            'itemId': '='
        },
        template: '<div style="display: inline;">{{item}}</div>',
        replace: true,
        controller: ['$scope', 'ItemNameManagementService', function ($scope,ItemNameManagementService) {
            var vm = $scope;

            vm.$on('change-language', function () {
                vm.service.setNTSLabelName(vm);
            });

            vm.service = ItemNameManagementService;

            initpage();

            function initpage() {
                vm.service.setNTSLabelName(vm);
            }

        }],
    };
    

}]);
