app.directive('datepickerWeek', [function () {
    return {
        restrict: 'E',
        scope: {
            'isValidate': '@',
            'textValidate': '@',
            'startWeek': '=',
            'endWeek': '=',
            'dateChange': '&',
            'disableDatepicker': '=',
        },
        templateUrl: 'app/common/directives/datepickerweek/datepickerweek.html',
        replace: true,
        controller: ['$scope', '$timeout', function ($scope, $timeout) {
            var vm = $scope;
            vm.ModelWeek;
            vm.ModelDate;
            vm.showValidate = false;
            vm.isRequired = false;
            vm.Format = 'dd/MM/yyyy';
            vm.DatePicker = {
                status: {
                    opened: false
                },
                open: function ($event) {
                    if (!$scope.disableDatepicker == 1) {
                        vm.DatePicker.status.opened = true;
                    }
                },
                open2: false,
            };
            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            vm.DatePicker.open = function ($event, type) {
                $event.preventDefault();
                $event.stopPropagation();
                if (!$scope.disableDatepicker == 1) {
                    vm.DatePicker[type] = true;
                }
            };

            vm.DatePicker.ChangeDate = function () {

                setWeek();
                if ($scope.dateChange) {
                    $timeout(function () {
                        $scope.$eval($scope.dateChange());
                    });
                }
            };

            initData();

            function initData() {

                vm.ModelDate = moment().locale('vi').startOf('isoWeek').toDate();
                setWeek();
                if ($scope.modelDate != null) {
                    $scope.$watch('modelDate', function () {

                    });
                }


                $scope.$watch('isValidate', function () {
                    if ($scope.isValidate == 1) {
                        vm.isRequired = true;
                    }
                    else {
                        vm.isRequired = false;
                    }
                });

            }

            function setWeek() {
                var momentDate = moment(vm.ModelDate).locale('vi');
                vm.ModelWeek = 'Tuần ' + momentDate.isoWeek() + ', ' + momentDate.startOf('isoWeek').format('DD') + ' - ' + momentDate.endOf('isoWeek').format('DD/MM/YYYY')
                vm.startWeek = momentDate.startOf('isoWeek').format('YYYY-MM-DD');
                vm.endWeek = momentDate.endOf('isoWeek').format('YYYY-MM-DD');
                vm.ModelDate = moment(vm.startWeek).locale('vi').toDate();
            }

        }],
    };

}]);
