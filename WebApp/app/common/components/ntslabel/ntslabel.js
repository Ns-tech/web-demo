(function () {
  'use strict';

  angular
    .module('app')
    .component('ntsLabel', {
      controller: Controller,
      templateUrl: 'app/common/components/ntslabel/ntslabel.html',
      bindings: {
        formId: '=',
        itemId: '='
      },
      required: {
        formId: true,
        itemId: true
      }
    });

  Controller.$inject = ['ItemNameManagementService', '$scope'];

  var ctrl;

  function Controller(ItemNameManagementService, $scope) {
    ctrl = this;
    ctrl.service = ItemNameManagementService;

    $scope.$on('change-language', function () {
        ctrl.service.setNTSLabelName(ctrl);
    });
  }

  Controller.prototype.$onInit = function() {   
    ctrl.service.setNTSLabelName(ctrl);
    ctrl.onInit = 'Success';
  };
})();
