/**
 * angular-timer - v1.3.4 - 2016-05-01 9:52 PM
 * https://github.com/siddii/angular-timer
 *
 * Copyright (c) 2016 Siddique Hameed
 * Licensed MIT <https://github.com/siddii/angular-timer/blob/master/LICENSE.txt>
 */

/**
*
*
*/
angular.module('app').directive('autoCheckTime', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            objectCheckAttr: '=objectCheck',
            counttimeidAttr: '=countTimeId',
            interval: '=interval',
            checkTimeAttr: '=checkTime',
            formatTimeAttr: '=formatTime',
            finishCallback: '&finishCallback',
            autoStart: '&autoStart'
        },
        controller: ['$scope', '$element', '$attrs', '$timeout', '$interpolate', function ($scope, $element, $attrs, $timeout, $interpolate) {
            $scope.autoStart = $attrs.autoStart || $attrs.autostart;
            $scope.countTimeId = $scope.counttimeidAttr;
            $scope.checkTime = $scope.checkTimeAttr;
            $scope.formatTime = $scope.formatTimeAttr;
            $scope.currentTime = null;
            $scope.isRunning = false;

            $scope.$on('counttime-start-' + $scope.countTimeId, function () {
                $scope.start();
            });

            $scope.$on('timer-resume-' + $scope.countTimeId, function () {
                $scope.resume();
            });

            $scope.$on('timer-stop-' + $scope.countTimeId, function () {
                $scope.stop();
            });

            $scope.$on('timer-clear-' + $scope.countTimeId, function () {
                $scope.clear();
            });

            $scope.$on('timer-reset-' + $scope.countTimeId, function () {
                $scope.reset();
            });

            function resetTimeout() {
                if ($scope.timeoutId) {
                    clearTimeout($scope.timeoutId);
                }
            }

            $scope.$watch('startTimeAttr', function (newValue, oldValue) {
                if (newValue !== oldValue && $scope.isRunning) {
                    $scope.start();
                }
            });

            $scope.$watch('endTimeAttr', function (newValue, oldValue) {
                if (newValue !== oldValue && $scope.isRunning) {
                    $scope.start();
                }
            });

            $scope.start = $element[0].start = function () {
                $scope.countTimeId = $scope.counttimeidAttr;
                if ($scope.countTimeId) {
                    $scope.checkTime = $scope.checkTimeAttr ? $scope.checkTimeAttr : 0;
                    $scope.formatTime = $scope.formatTimeAttr;
                    resetTimeout();
                    tick();
                    $scope.isRunning = true;
                }
            };

            $scope.resume = $element[0].resume = function () {
                if ($scope.countTimeId) {
                    resetTimeout();
                    tick();
                    $scope.isRunning = true;
                }
            };

            $scope.stop = $scope.pause = $element[0].stop = $element[0].pause = function () {
                if ($scope.countTimeId) {
                    var timeoutId = $scope.timeoutId;
                    $scope.clear();
                    $scope.$emit('timer-stopped', {});
                }
            };

            $scope.clear = $element[0].clear = function () {
                if ($scope.countTimeId) {
                    // same as stop but without the event being triggered
                    resetTimeout();
                    $scope.timeoutId = null;
                    $scope.isRunning = false;
                }
            };

            $scope.reset = $element[0].reset = function () {
                $scope.countTimeId = $scope.counttimeidAttr;
                if ($scope.countTimeId) {
                    $scope.checkTime = $scope.checkTimeAttr ? $scope.checkTimeAttr : 0;
                    $scope.formatTime = $scope.formatTimeAttr;
                    resetTimeout();
                    tick();
                    $scope.isRunning = false;
                    $scope.clear();
                }
            };

            $element.bind('$destroy', function () {
                resetTimeout();
                $scope.isRunning = false;
            });

            function calculateTime() {
                $scope.currentTime = moment().locale('vi').toDate();
            }

            calculateTime();

            var tick = function tick() {

                calculateTime();

                if (!moment($scope.checkTime).locale('vi').isAfter($scope.currentTime)) {
                    $scope.stop();
                    if ($scope.finishCallback) {
                        $scope.$eval($scope.finishCallback);
                    }
                    return;
                }

                //We are not using $timeout for a reason. Please read here - https://github.com/siddii/angular-timer/pull/5
                $scope.timeoutId = setTimeout(function () {
                    tick();
                    $scope.$digest();
                }, $scope.interval);
            };

            if ($scope.autoStart === undefined || $scope.autoStart === true) {
                $scope.start();
            }
        }]
    };
}]);
