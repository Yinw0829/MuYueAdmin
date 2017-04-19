angular.module('roleCtrl', [])
    .controller('figureCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', '$resource', 'MY', '$stateParams', 'volumeLangIdService', 'getListService', function ($scope, $modal, $http, $timeout, $compile, Upload, $resource, MY, $stateParams, volumeLangIdService, getListService) {
        //基本配置
        $scope.user = '人物新增';
        $scope.my = MY;
        $scope.url = $scope.my.url;
        console.log($stateParams);
        $scope.indexVolumeId = $stateParams.volumeId;
        $scope.indexId = $stateParams.id;
        console.log($scope.indexId);
        $scope.langBtn = 'zh_cn';  //默认语言
        //Http请求
        var FigList = $resource($scope.url, {}, {
            FigureList: {
                url: $scope.url + 'volume/lang/caricature/list',
                method: 'GET',
                isArray: false,
                params: {volumeNo: '@volumeNo'}
            },
            seeList: {
                url: $scope.url + 'volume/lang/caricature/load',
                method: 'GET',
                isArray: false,
                params: {id: '@id'}
            }
        });
        //url配置
        $scope.listUrl = 'volume/lang/caricature/list';
        //通过服务找列表
        getListService.getIdList($scope.listUrl, $scope.indexVolumeId, $scope.langBtn);
        $scope.$on("getListSuccess.Service", function () {
            $scope.FiguList = getListService.getIdListValue();
            console.log($scope.FiguList)
        });
        //页面加载的时候请求
        volumeLangIdService.getVolumeLangId($scope.indexVolumeId, $scope.langBtn);
        $scope.$on("notifyVolumeLangId.Service", function () {
            $scope.addVolumeId = volumeLangIdService.returnVolumeLangId();
            console.log($scope.addVolumeId);
        });
        //切换语言时候请求
        $scope.langClick = function (lang) {
            $scope.langBtn = lang;
            volumeLangIdService.getVolumeLangId($scope.indexVolumeId, lang);//获取volumeLangId
            getListService.getIdList($scope.listUrl, $scope.indexVolumeId, lang);//拉取列表
        };
        //新增中文人物
        $scope.newLay = function () {
            $scope.newFig = "新增人物";
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newFigure.html',
                controller: 'FigCtrl',
                scope: $scope,
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.item;
                    }
                }
            });
            modalInstance.result.then(function () {
                FigList.FigureList({volumeNo: $scope.indexVolumeId, lang: 'zh_cn'}, function (resp) {
                    $scope.FiguList = resp.rows;
                });
            })
        };
        $scope.seeClick = function (id) {
            console.log(id);
            $scope.see = "人物详细";
            FigList.seeList({id: id}, function (resp) {
                $scope.item = resp.result;
                console.log(resp.result);
            });
            var modalInstance = $modal.open({
                templateUrl: 'views/model/FigSee.html',
                controller: 'FigSeeCtrl',
                scope: $scope,
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.item;
                    }
                }
            });
        };
        // 编辑
        $scope.reductClick = function (id) {
            $scope.item = id;
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newRedact.html',
                controller: 'newRedactCtrl',
                scope: $scope,
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.item;
                    }
                }
            });
            modalInstance.result.then(function () {
                FigList.FigureList({volumeLangId: $scope.indexId, lang: 'zh_cn'}, function (resp) {
                    $scope.FiguList = resp.rows;
                    console.log($scope.FiguList);
                });
            });
            modalInstance.result.then(function () {
                FigList.FigureList({volumeLangId: $scope.indexId, lang: 'zh_tw'}, function (resp) {
                    $scope.FigutwList = resp.rows;
                    console.log($scope.FigutwList);
                });
            });
            modalInstance.result.then(function () {
                FigList.FigureList({volumeLangId: $scope.indexId, lang: 'en'}, function (resp) {
                    $scope.FiguenList = resp.rows;
                    console.log($scope.FiguenList);
                });
            })
        };
        // 删除
        $scope.delClick = function (items) {
            console.log(items);
            $scope.item = items;
            $scope.cancel1 = "人物删除";
            var modalInstance = $modal.open({
                templateUrl: 'views/model/delClick.html',
                controller: 'FigDelCtrl',
                scope: $scope,
                size: 'md',
                resolve: {
                    items: function () {
                        return $scope.item;
                    }
                }
            });
            modalInstance.result.then(function () {
                getListService.getIdList($scope.listUrl, $scope.indexVolumeId, $scope.langBtn);
            });
        };
    }])
    //人物中文新增
    .controller('FigCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance) {
        var upLoadUrl = $scope.url + '/volume/lang/caricature/add';
        $scope.uploadImg = '';
        $scope.uploadImgInd = '';
        $scope.preserve = function () {
            Upload.upload({
                url: upLoadUrl,
                data: {
                    imgFile: $scope.file,
                    avatorFile: $scope.avatorFile,
                    volumeLangId: $scope.addVolumeId,
                    title: $scope.title,
                    sort: $scope.sort,
                    description: $scope.description,
                    introduction: $scope.introduction
                    // lang: 'zh_cn'
                }
            }).then(function (resp) {
                console.log(resp);
                $modalInstance.close()
            })
        }
    }])
    // 人物繁体新增
    .controller('FigTwCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance) {
        var upLoadUrl = $scope.url + '/volume/lang/caricature/add';
        $scope.uploadImg = '';
        $scope.uploadImgInd = '';
        $scope.preserve = function () {
            Upload.upload({
                url: upLoadUrl,
                data: {
                    imgFile: $scope.file,
                    avatorFile: $scope.avatorFile,
                    volumeLangId: $scope.addVolumeId,
                    title: $scope.title,
                    sort: $scope.sort,
                    description: $scope.description,
                    introduction: $scope.introduction,
                    lang: 'zh_tw'
                }
            }).then(function (resp) {
                console.log(resp);
                $modalInstance.close()
            })
        }
    }])
    // 人物英文新增
    .controller('FigEnCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance) {
        var upLoadUrl = $scope.url + '/volume/lang/caricature/add';
        $scope.uploadImg = '';
        $scope.uploadImgInd = '';
        $scope.preserve = function () {
            Upload.upload({
                url: upLoadUrl,
                data: {
                    imgFile: $scope.file,
                    avatorFile: $scope.avatorFile,
                    volumeLangId: $scope.addVolumeId,
                    title: $scope.title,
                    sort: $scope.sort,
                    description: $scope.description,
                    introduction: $scope.introduction,
                    lang: 'en'
                }
            }).then(function (resp) {
                console.log(resp);
                $modalInstance.close()
            })
        }
    }])
    // 人物查看
    .controller('FigSeeCtrl', ['$scope', '$modalInstance', '$resource', 'items', function ($scope, $modalInstance, $resource, items) {
        $scope.ok = function (id) {
            $modalInstance.close(items)
        }
    }])
    // 人物编辑
    .controller('newRedactCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', 'items', 'MY', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance, items, MY) {
        $scope.redact1 = "人物编辑";
        $scope.url = MY.url;
        console.log(items);
        var FigList = $resource($scope.url, {}, {
            seeList: {
                url: $scope.url + 'volume/lang/caricature/load',
                method: 'GET',
                isArray: false
            }
        });
        FigList.seeList({id: items}, function (resp) {
            $scope.group = resp.result;
            console.log($scope.group);
        });
        var upLoadUrl = $scope.url + 'volume/lang/caricature/modify';

        $scope.uploadImg = '';
        $scope.uploadImgInd = '';
        $scope.preserve = function (id) {
            if ($scope.file == undefined) {
                Upload.upload({
                    url: upLoadUrl,
                    data: {
                        imgFile: $scope.group.imgFile,
                        avatorFile: $scope.group.avatorFile,
                        id: $scope.group.id,
                        title: $scope.group.title,
                        sort: $scope.group.sort,
                        description: $scope.group.description,
                        introduction: $scope.group.introduction,
                        lang: 'zh_ch'
                    }
                }).then(function (resp) {
                    console.log(resp);
                    $modalInstance.close()
                })
            }
        };
    }])
    // 人物删除
    .controller('FigDelCtrl', ['$scope', '$modalInstance', 'items', '$resource', 'postIdService', function ($scope, $modalInstance, items, $resource, postIdService) {
        $scope.using = function () {
            postIdService.postIdRequest('volume/lang/caricature/del', items);
        };
        $scope.$on("postId.Service", function () {
            $scope.resultServic = postIdService.postIdBackValue();
            if ($scope.resultServic.success) {
                $modalInstance.close();
            }
        });
        $scope.cancel = function () {
            $modalInstance.close();
        };
        $scope.$on('postId.Service', function () {
            $scope.successMag = postIdService.postIdBackValue();
        });
    }])
