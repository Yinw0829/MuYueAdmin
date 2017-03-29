angular.module('userCtrl', [])
//    世界观
    .controller('indexCtrl', ['$scope', '$http', '$timeout', '$compile', 'Upload', function ($scope, $http, $timeout, $compile, Upload) {
        $scope.indecCtrl = 'indexCtrl'
    }])
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
    .controller('catalogCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {
        $scope.user = '目录'
    }]);
