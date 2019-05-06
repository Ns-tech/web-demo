(function () {
    'use strict';

    app.filter('ntsMinutesFormat', Filter);

    function Filter() {
        function isEmpty(value) {
            return angular.isUndefined(value) || angular.equals(value, null);
        }
        return function (input, formatString) {
            var defVal = '0';
            if (!isEmpty(input)) {
                var time = moment().locale('vi').set({ hour: 0, minute: 0, second: 0, millisecond: 0 })

                return time.minutes(input).format(formatString);
            }

            return defVal;
        };
    }
})();