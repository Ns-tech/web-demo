app.directive('drawingTool', [function () {
    return {
        restrict: 'E',
        scope: {
            'modelImage': '=',
            'modelImagePath': '='
        },
        templateUrl: 'app/common/directives/drawing/drawing.html',
        replace: true,
        controller: ['$scope', '$timeout', '$document', 'ngAuthSettings', function ($scope, $timeout, $document, ngAuthSettings) {
            var vm = $scope;
            // vm.ctx = element[0].getContext('2d');
            vm.Current = angular.element('#drawing');
            vm.Canvas = vm.Current[0];
            vm.ctx = vm.Canvas.getContext('2d');
            // variable that decides if something should be drawn on mousemove
            vm.drawing = false;
            vm.ListUndo = [];
            vm.ListRedo = [];
            // the last coordinates before the current move
            vm.lastX;
            vm.lastY;
            vm.ImagePathDefault = '/img/patient_image.png';
            vm.UndoDraw = undoDraw;
            vm.RedoDraw = redoDraw;
            vm.ResetDraw = resetDraw;

            initData();
            vm.Current.bind('mousedown', function (event) {
                if (event.offsetX !== undefined) {
                    vm.lastX = event.offsetX;
                    vm.lastY = event.offsetY;
                } else {
                    vm.lastX = event.layerX - event.currentTarget.offsetLeft;
                    vm.lastY = event.layerY - event.currentTarget.offsetTop;
                }
                saveState(vm.Canvas);
                // begins new line
                vm.ctx.beginPath();
                vm.drawing = true;
            });
            vm.Current.bind('mousemove', function (event) {
                if (vm.drawing) {
                    // get current mouse position
                    if (event.offsetX !== undefined) {
                        vm.currentX = event.offsetX;
                        vm.currentY = event.offsetY;
                    } else {
                        vm.currentX = event.layerX - event.currentTarget.offsetLeft;
                        vm.currentY = event.layerY - event.currentTarget.offsetTop;
                    }

                    draw(vm.lastX, vm.lastY, vm.currentX, vm.currentY);

                    // set current coordinates to last one
                    vm.lastX = vm.currentX;
                    vm.lastY = vm.currentY;
                }

            });
            vm.Current.bind('mouseup', function (event) {
                // stop drawing
                vm.drawing = false;

            });

            // canvas reset
            function reset() {
                element[0].width = element[0].width;
            }

            function draw(lX, lY, cX, cY) {
                // line from
                vm.ctx.moveTo(lX, lY);
                // to
                vm.ctx.lineTo(cX, cY);
                // color
                vm.ctx.strokeStyle = "#4bf";
                // draw it
                vm.ctx.stroke();
                vm.modelImage = vm.Canvas.toDataURL()
                $timeout(function () {
                    vm.$apply();
                }, 0);
            }

            function initData() {
                vm.StyleCanvas = {
                    width: '420px',
                    height: '291px'
                }
                if (vm.modelImagePath) {
                    drawBackgroundImageBase64(vm.modelImagePath);
                }
                else {
                    drawBackgroundImage(vm.ImagePathDefault);
                }
            }

            function drawBackgroundImage(imagePath) {
                var imageObj = new Image();
                imageObj.onload = function () {
                    vm.ctx.drawImage(imageObj, 0, 0, 453, 302, 0, 0, 453, 302);

                };
                imageObj.src = imagePath;

            }

            function drawBackgroundImageBase64(imageBase64) {
                var imageObj = new Image();
                imageObj.onload = function () {
                    vm.ctx.drawImage(imageObj, 0, 0, 453, 302, 0, 0, 453, 302);

                };
                imageObj.src = imageBase64;
            }


            function saveState(canvas, list, keep_redo) {
                keep_redo = keep_redo || false;
                if (!keep_redo) {
                    vm.ListRedo = [];
                }

                (list || vm.ListUndo).push(canvas.toDataURL());

                $timeout(function () {
                    vm.$apply();

                }, 0);
            }

            function undoDraw() {
                restoreState(vm.ListUndo, vm.ListRedo);
            }

            function redoDraw() {
                restoreState(vm.ListRedo, vm.ListUndo);
            }

            function restoreState(pop, push) {
                if (pop.length) {
                    saveState(vm.Canvas, push, true);
                    var restore_state = pop.pop();
                    var imageObj = new Image();
                    vm.modelImage = restore_state;
                    imageObj.onload = function () {
                        vm.ctx.clearRect(0, 0, vm.Canvas.width, vm.Canvas.height);
                        vm.ctx.drawImage(imageObj, 0, 0, 453, 302, 0, 0, 453, 302);
                    };
                    imageObj.src = restore_state;
                }
            }

            function resetDraw() {
                vm.ListRedo = [];
                vm.ListUndo = [];
                ///vm.ctx.clearRect(0, 0, vm.Canvas.width, vm.Canvas.height);
                drawBackgroundImage(vm.ImagePathDefault);
            }
        }]
    };
}]);
