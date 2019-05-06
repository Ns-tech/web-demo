app.directive('cardBank', [function () {
    return {
        restrict: 'E',
        scope: {
            'modelCardId': '=',
            'disableCard': '=',
        },
        templateUrl: 'app/common/directives/cardbank/cardbank.html',
        replace: true,
        controller: ['$scope', 'Constant', function ($scope, Constant) {
            var vm = $scope;
            vm.ChooseCard = fnChooseCard;
            vm.ListBank = Constant.LIST_BANK;

            function fnChooseCard(cardid) {
                if (!vm.disableCard) {
                    vm.modelCardId = cardid;
                }
            }           
        }]
    };
}]);
