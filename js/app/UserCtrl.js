angular.module('userCtrl', [])
// 首页
    .controller('indexCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', 'dataListService', '$resource', function ($scope, $modal, $http, $timeout, $compile, Upload, dataListService, $resource) {
        // $scope.url = MY.API + '';
        // var getUser = $resource(
        // $scope.url + 'type',
        // {
        //     id:'@id'
        // },{
        //
        // })
        $scope.indecCtrl = 'indexCtrl';
        $scope.newLay = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newLayout.html',
                controller: 'homeCtrl',
                scope: $scope,
                size: 'lg'
            });
        }
    }])
    //首页新增
    .controller('homeCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
        var first = $resource($scope.url + 'add');
        $scope.first = function (id) {
            first.save({name: name, id: id}, function () {
                $modalInstance.close();
            })
        }
    }])
    //    世界观
    .controller('worldCtrl', ['$scope', '$stateParams', '$resource', function ($scope, $stateParams, $resource) {
        $scope.user = '世界观';
        $scope.index = $stateParams.volumeId;
        console.log($scope.index);
        console.log($resource)
    }])
    //    人物
    .controller('figureCtrl', ['$scope', '$stateParams', 'Upload', '$timeout', function ($scope, $stateParams, Upload, $timeout) {
        $scope.user = '人物';
        $scope.uploadFiles = function (files, errFiles) {
            $scope.files = files;
            console.log(files);
            $scope.errFiles = errFiles;
            //url是图片上传的接口，data是post的数据
            angular.forEach(files, function (file) {
                console.log('选择完成图片所触发的事件');
                file.upload = Upload.upload({
                    //图片上传的API；
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    //以及POST的数据；
                    data: {file: file}
                });
                file.upload.then(function (response) {
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            });
        }
    }])
    //    CG图例
    .controller('legendCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.user = 'CG图例'
    }])
    //    目录
    .controller('catalogCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', 'dataListService', '$resource',function ($scope, $modal, $http, $timeout, $compile, Upload, dataListService, $resource) {
        $scope.user = '目录';
        // dataListService.dataListUrl(address, postData);
        // $scope.on('dataList.Service', function () {
        //     $scope.list = dataListService.successList
        // });
        $scope.newCata = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newlyCatalog.html',
                controller: 'newLayCtrl',
                scope: $scope,
                size: 'lg'
            });
        }
    }])
    .controller('newLayCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
                var first = $resource($scope.url + 'add');
                $scope.first = function (id) {
                    first.save({name: name, id: id}, function () {
                        $modalInstance.close();
                    })
                }
    }])