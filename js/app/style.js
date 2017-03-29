var myApp = angular.module('myApp', ['ngFileUpload']);

myApp.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        console.log(files);
        $scope.errFiles = errFiles;
        //url是图片上传的接口，data是post的数据
        angular.forEach(files, function(file) {
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
}]);
