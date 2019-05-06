angular.module('app').factory('message', ['$uibModal', function ($uibModal) {

    var ShowMessageFactory = {
        ShowMessage: fnShowMessage,
        ShowMessageMultiLine: fnShowMessageMultiLine
    };

    return ShowMessageFactory;

    function fnShowMessage(message, type) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/common/modal/message/view.html',
            controller: 'messageCtrl',
            controllerAs: 'vmMessage',
            windowClass: 'app-modal-window-select-message',
            resolve: {
                messageinfo: function () {
                    return {
                        content: message,
                        ok: "Đóng",
                        title: "Thông báo",
                        type: type
                    };
                }
            }
        });

    }

    function fnShowMessageMultiLine(listContent, type) {
        var modalInstance = $uibModal.open({
            templateUrl: 'app/common/modal/messagemultiline/view.html',
            controller: 'messageMultiLineCtrl',
            controllerAs: 'vmMessage',
            windowClass: 'app-modal-window-select-message',
            resolve: {
                deps: ['$ocLazyLoad',
                      function ($ocLazyLoad) {
                          return $ocLazyLoad.load([
                             'app/common/modal/messagemultiline/messagecontroller.js'
                          ]);
                      }
                ], messageinfo: function () {
                    return {
                        ListContent: listContent,
                        ok: "Đóng",
                        title: "Thông báo",
                        type: type
                    };
                }
            }
        });
    }
}]);
