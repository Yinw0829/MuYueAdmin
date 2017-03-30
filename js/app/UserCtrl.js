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
        // 新增
        $scope.indecCtrl = 'indexCtrl';
        $scope.newLay = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newLayout.html',
                controller: 'homeCtrl',
                scope: $scope,
                size: 'lg'
            });
        };
        // 查看
        $scope.seeClick = function () {
            //需地址穿ID
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newSeeLayout.html',
                controller: 'seeCtrl',
                scope: $scope,
                size: 'lg'
            });

        };
        // 编辑
        $scope.compile = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/model/redact.html',
                controller: 'redactCtrl',
                scope: $scope,
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.item;
                    }
                }
            });
        };
        // 删除
        $scope.delClick = function (id) {
            var modalInstance = $modal.open({
                templateUrl: 'views/model/delClick.html',
                controller: 'delCtrl',
                scope: $scope,
                size: 'md',
                resolve: {
                    items: function () {
                        return $scope.item;
                    }
                }
            })
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
    // 删除
    .controller('delCtrl', ['$scope', '$modalInstance', 'items', '$resource', function ($scope, $modalInstance, items, $resource) {
        var firstDel = $resource(
            $scope.url + 'del',
            {id: "@id"},
            {dataDelete: {method: 'POST', isArray: false}});
        $scope.dele = function (id) {
            firstDel.dataDelete({id: id}, function (data) {
                $modalInstance.close(items);
            })
        }
    }])
    // 查看
    .controller('seeCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
        $scope.ok = function (userId) {
            $modalInstance.close(items)
        }
    }])
    // 编辑
    .controller('redactCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
        var redact = $resource($scope.url + 'type/modify');
        $scope.redact = function (id) {
            redact.save(
                {
                    id: $scope.postCheck.id,
                    name: $scope.postCheck.name
                }, function () {
                    $modalInstance.close(items);
                })
        };
    }])





//    世界观
    .controller('worldCtrl', ['$scope', '$stateParams', '$resource', function ($scope, $stateParams, $resource) {
        $scope.user = '世界观';
        $scope.index = $stateParams.volumeId;
        console.log($scope.index);
        console.log($resource);

        $scope.queen = false;
        $scope.preserve = function () {
            $scope.queen = !$scope.queen;
        };


        // 拿到http:"地址"列表
        // dizhi.dizhi(data,function (reg) {
        //     if(reg.none){
        //         // 显示保存
        //     }else{
        //        // 显示编辑
        //     }
        // });
        // var first = $resource($scope.url + 'add');
        // $scope.first = function (id) {
        //     first.save({id: id,name:name,jian:jie,gai:yao,img:img,yu:yan}, function () {
        //         $modalInstance.close();
        //     });
        //     //刷新
        // };

        // var show=true;
        // $scope.show = {
        //
        // };
        // $scope.menuState = {
        //     show: true
        // };
        // $scope.toggleMenu = function() {
        //     $scope.menuState.show = !$scope.menuState.show;
        // }


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
    .controller('catalogCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', 'dataListService', '$resource', function ($scope, $modal, $http, $timeout, $compile, Upload, dataListService, $resource) {
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