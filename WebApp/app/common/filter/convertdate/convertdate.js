(function () {
    'use strict';

    app.filter('ntsConvortdate', Filter);

    function Filter() {
        function isEmpty(value) {
            return angular.isUndefined(value) || angular.equals(value, null);
        }
        return function (input, formatString) {
            var defVal = '';
            if (!isEmpty(input)) {
                return moment(input).locale('vi').format(formatString);
            }

            return defVal;
        };
    }
})();