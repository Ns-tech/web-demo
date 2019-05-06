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
angular.module('app').directive('countTime', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            counttimeidAttr: '=countTimeId',
            interval: '=interval',
            startTimeAttr: '=startTime',
            endTimeAttr: '=endTime',
            countDownAttr: '=countDown',
            countTypeAttr: '=countType',
            finishCallback: '&finishCallback',
            autoStart: '&autoStart',
            language: '@?',
            fallback: '@?',
            maxTimeUnit: '=',
            seconds: '=?',
            minutes: '=?',
            hours: '=?',
            displaycount: '=?'
        },
        controller: ['$scope', '$element', '$attrs', '$timeout', '$interpolate', function ($scope, $element, $attrs, $timeout, $interpolate) {

            if ($element.html().trim().length === 0) {
                $element.append($compile('<span>' + $interpolate.startSymbol() + 'millis' + $interpolate.endSymbol() + '</span>')($scope));
            } else {
                $element.append($compile($element.contents())($scope));
            }

            $scope.autoStart = $attrs.autoStart || $attrs.autostart;
            $scope.countTimeId = $scope.counttimeidAttr;
            $scope.startTime = null;
            $scope.endTime = null;
            $scope.timeoutId = null;
            $scope.counttype = null;
            $scope.isCallback = false;
            $scope.countdown = angular.isNumber($scope.countDownAttr) ? parseInt($scope.countDownAttr, 10) : 0;
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

            $scope.$on('timer-set-countdown-' + $scope.countTimeId, function (e, countdown) {
                $scope.countdown = countdown;
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
                    $scope.isCallback = false;
                    $scope.startTime = $scope.startTimeAttr ? $scope.startTimeAttr : 0;
                    $scope.endTime = $scope.endTimeAttr ? $scope.endTimeAttr : 0;
                    $scope.counttype = $scope.countTypeAttr ? $scope.countTypeAttr : 0;
                    if (!angular.isNumber($scope.countdown)) {
                        $scope.countdown = angular.isNumber($scope.countDownAttr) ? parseInt($scope.countDownAttr, 10) : 0;
                    }
                    resetTimeout();
                    tick();
                    $scope.isRunning = true;
                }
            };

            $scope.resume = $element[0].resume = function () {
                if ($scope.countTimeId) {
                    resetTimeout();
                    if ($scope.countDownAttr) {
                        $scope.countdown += 1;
                    }
                    $scope.startTime = $scope.stoppedTime;
                    $scope.isCallback = false;
                    tick();
                    $scope.isRunning = true;
                }
            };

            $scope.stop = $scope.pause = $element[0].stop = $element[0].pause = function () {
                if ($scope.countTimeId) {
                    var timeoutId = $scope.timeoutId;
                    $scope.clear();
                    $scope.$emit('timer-stopped', { timeoutId: timeoutId, seconds: $scope.seconds, minutes: $scope.minutes, hours: $scope.hours });
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
                    $scope.isCallback = false;
                    $scope.startTime = $scope.startTimeAttr ? moment($scope.startTimeAttr) : moment();
                    $scope.endTime = $scope.endTimeAttr ? moment($scope.endTimeAttr) : null;
                    $scope.counttype = $scope.countTypeAttr ? $scope.countTypeAttr : 0;
                    $scope.countdown = angular.isNumber($scope.countDownAttr) ? parseInt($scope.countDownAttr, 10) : 0;
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

            function calculateCount() {
                if ($scope.counttype == 0 && $attrs.startTime !== undefined) {
                    $scope.startTime++;

                    $scope.minutes = Math.floor($scope.startTime / 60);
                    $scope.seconds = $scope.startTime % 60;
                    $scope.hours = Math.floor($scope.minutes / 60);

                    if ($scope.hours == 0) {
                        $scope.displaycount = $scope.minutes + ':' + $scope.seconds;
                    } else {
                        $scope.minutes = $scope.minutes % 60;
                        $scope.displaycount = $scope.hours + ':' + $scope.minutes + ':' + $scope.seconds;
                    }
                }

                if ($scope.counttype == 1) {
                    $scope.countdown--;
                    $scope.minutes = Math.floor(Math.abs($scope.countdown) / 60);
                    $scope.seconds = Math.abs($scope.countdown) % 60;
                    $scope.hours = Math.floor($scope.minutes / 60);

                    if ($scope.hours == 0) {
                        $scope.displaycount = ($scope.countdown < 0 ? '-' : '') + $scope.minutes + ':' + $scope.seconds;
                    } else {
                        $scope.minutes = $scope.minutes % 60;
                        $scope.displaycount = ($scope.countdown < 0 ? '-' : '') + $scope.hours + ':' + $scope.minutes + ':' + $scope.seconds;
                    }
                }
            }

            calculateCount();

            var tick = function tick() {

                calculateCount();

                if ($scope.counttype == 1 && $scope.countdown <= 0) {                   
                    if (!$scope.isCallback && $scope.finishCallback) {
                        $scope.isCallback = true;
                        $scope.$eval($scope.finishCallback);
                    }
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
