app.directive('painScale', [function () {
    return {
        restrict: 'E',
        scope: {
            'modelPainScale': '=',
            'disablePainScale': '=',
        },
        templateUrl: 'app/common/directives/painscale/painscale.html',
        replace: true,
        controller: ['$scope', function ($scope) {
            var vm = $scope;
            vm.choosePainScale = fnchoosePainScale;

            function fnchoosePainScale(scale) {
                if (!vm.disablePainScale) {
                    vm.modelPainScale = scale;
                }
            }
        }]
    };
}]);
