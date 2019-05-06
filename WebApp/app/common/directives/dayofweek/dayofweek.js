app.directive('dayOfWeek', [function () {
    return {
        restrict: 'E',
        scope: {
            'modelDay': '=',
            'disableDay': '=',
        },
        templateUrl: 'app/common/directives/dayofweek/dayofweek.html',
        replace: true,
        controller: ['$scope', function ($scope) {
            var vm = $scope;
            vm.chooseDay = fnchooseDay;
            vm.IsCheck = fnIsCheck;

            function fnchooseDay(day) {
                if (!vm.disableDay) {

                    var index = vm.modelDay.indexOf(day);

                    if (index != -1) {
                        vm.modelDay.splice(index, 1);
                    } else {
                        vm.modelDay.push(day);
                    }
                }
            }

            function fnIsCheck(day) {
                if (vm.modelDay.indexOf(day) != -1) {
                    return true;
                }

                return false;
            }
        }]
    };
}]);
