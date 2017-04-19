angular.module('userCtrl', [])

//    目录
    .controller('catalogCtrl', ['$scope', '$modal', 'Upload', '$resource', 'MY', '$stateParams', 'volumeLangIdService', 'getListService', function ($scope, $modal, Upload, $resource, MY, $stateParams, volumeLangIdService, getListService) {
        $scope.user = '目录';
        $scope.url = MY.url;
        var catalist = $resource($scope.url, {}, {
            getCata: {
                url: $scope.url + 'volume/lang/menu/load',
                method: 'GET',
                isArray: false,
                params: {id: '@id'}
            }
        });
        $scope.my = MY;
        $scope.url = $scope.my.url;
        $scope.indexVolumeId = $stateParams.volumeId;
        $scope.indexId = $stateParams.id;
        $scope.langBtn = 'zh_cn';  //默认语言
        $scope.listUrl = 'volume/lang/menu/list';        // 地址配置
        //页面打开时加载列表
        getListService.getIdList($scope.listUrl, $scope.indexVolumeId, $scope.langBtn);
        $scope.$on("getListSuccess.Service", function () {
            $scope.CataList = getListService.getIdListValue();
        });
        //页面加载的时候请求
        volumeLangIdService.getVolumeLangId($scope.indexVolumeId, $scope.langBtn);
        $scope.$on("notifyVolumeLangId.Service", function () {
            $scope.addVolumeId = volumeLangIdService.returnVolumeLangId();
        });
        //切换语言时候请求
        $scope.langClick = function (lang) {
            $scope.langBtn = lang;
            volumeLangIdService.getVolumeLangId($scope.indexVolumeId, lang);//获取volumeLangId
            getListService.getIdList($scope.listUrl, $scope.indexVolumeId, lang);//拉取列表
        };
        // 新增
        $scope.newCata = function () {
            $scope.name = '新增目录';
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newlyCatalog.html',
                controller: 'addCataLogCtrl',
                scope: $scope,
                size: 'lg'
            });
            modalInstance.result.then(function () {

            })
        };
        //查看
        $scope.seeCataLog = function (id) {
            $scope.name = '查看目录';
            catalist.getCata({id: id}, function (resp) {
                $scope.item = resp.result;
            });
            var seeCataLogModal = $modal.open({
                templateUrl: 'views/model/seeCatalog.html',
                controller: 'checkLayCtrl',
                scope: $scope,
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.item;
                    }
                }
            })
        };
        // 编辑
        $scope.redact = function (id) {
            $scope.name = '编辑内容';
            $scope.item = id;
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newlyCatalog.html',
                controller: 'checkLayCtrl',
                scope: $scope,
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.item;
                    }
                }
            })
        };
        // 删除
        $scope.delClick = function (id) {
            var delCataLogModal = $modal.open({
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
    // 目录新增
    .controller('addCataLogCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance) {
        console.log($scope.langBtn);
        var upLoadUrl = $scope.url + 'volume/lang/menu/add';
        $scope.uploadImg = '';
        $scope.preserve = function () {
            Upload.upload({
                url: upLoadUrl,
                data: {
                    imgFile: $scope.file,
                    volumeLangId: $scope.addVolumeId,
                    title: $scope.title,
                    type: $scope.sex,
                    url: $scope.interlinkage,
                    urlName: $scope.urlName,
                    description: $scope.description,
                    introduction: $scope.introduction,
                    gameSort: $scope.gameSort,
                    cartoonSort: $scope.cartoonSort,
                    novelSort: $scope.novelSort
                }
            }).then(function (resp) {
                if (resp.data.success) {
                    $modalInstance.close()
                }
            })
        }
    }])
    // 目录查看
    .controller('seeCataLogCtrl', ['$scope', '$modalInstance', '$resource', 'items', function ($scope, $modalInstance, $resource, items) {
        $scope.certain = function (id) {
            $modalInstance.close(items)
        }
    }])
    //目录编辑
    .controller('checkLayCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', 'items', 'MY', '$resource', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance, items, MY, $resource) {
        $scope.name = '人物编辑';
        $scope.url = MY.url;
        var FigList = $resource($scope.url, {}, {
            seeList: {
                url: $scope.url + 'volume/lang/menu/load',
                method: 'GET',
                isArray: false
            }
        });
        FigList.seeList({id: items}, function (resp) {
            $scope.oCataLogGroup = resp.result;
            console.log($scope.oCataLogGroup);
        });
        var upLoadUrl = $scope.url + 'volume/lang/menu/modify';

        $scope.uploadImg = '';
        $scope.preserve = function (id) {
            if ($scope.file == undefined) {
                Upload.upload({
                    url: upLoadUrl,
                    data: {
                        imgFile:$scope.file,
                        volumeLangId: $scope.addVolumeId,
                        title:$scope.title,
                        type:$scope.typeName,
                        url:$scope.url,
                        urlName:$scope.urlName,
                        description:$scope.description,
                        introduction:$scope.introduction,
                        gameSort:$scope.gameSort,
                        cartoonSort:$scope.cartoonSort,
                        novelSort:$scope.novelSort
                    }
                }).then(function (resp) {
                    console.log(resp);
                    $modalInstance.close()
                })
            }
        };
    }]);