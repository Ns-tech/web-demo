
(function() {
  'use strict';

  angular
    .module('app')
    .factory('ItemNameManagementService', ItemNameManagementService);

  ItemNameManagementService.$inject = ['Constant', 'LanguageManagementService', '$resource', '$q'];

  function ItemNameManagementService(Constant, LanguageManagementService, $resource, $q) {

    var ItemNameManagementService = {
     
      getItemName : function (formId, itemId) {
        var deffered = $q.defer();
        var lang = LanguageManagementService.getLanguage();
        getItemNameProcess(lang, formId, itemId)
          .then(function (result) {            
            deffered.resolve(result);
          });
        return deffered.promise;
      },      
      setNTSLabelName: function (ctrl) {
        var lang = LanguageManagementService.getLanguage();
        getItemNameProcess(lang, ctrl.formId, ctrl.itemId)
        .then(function (result) {
          ctrl.item = result;
        });
      }
    };

    var getItemNameProcess = function (lang, formId, itemId) {
      var deffered = $q.defer();
      $resource(Constant.ITEM_GET.URL).get({itemfile: jsonFile(formId, lang)}).$promise
        .then (function (result) {
          var name = result[itemId];
          if (angular.isUndefined(name)) {
            deffered.resolve('');
          }
          deffered.resolve(name);
        })
        .catch (function (error) {
          deffered.resolve('');
        });
      return deffered.promise;
    }

    var jsonFile = function (formId, lang) {
      return Constant.ITEM_GET.JSON_FILE
        .replace('%formid%', formId)
        .replace('%lang%', Constant.LANG_FILE[lang])
    };

    return ItemNameManagementService;
  }
})();
