angular.module('worldCtrl', [])
    .controller('worldCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', '$resource', '$rootScope', 'MY', '$stateParams', function ($scope, $modal, $http, $timeout, $compile, Upload, $resource, $rootScope, MY, $stateParams) {
        //参数初始化
        $scope.myLang = MY;
        $scope.user = '世界观';
        $scope.url = MY.url;
        $scope.indexVolumeId = $stateParams.volumeId;
        $scope.indexId = $stateParams.id;
        $scope.worldData = new Object();
        $scope.loadList = new Object();
        $scope.upLoadBtn = true;
        $scope.spanShow = false;
        $scope.worldData.lang = MY.cn;
        var upLoad = $scope.url + 'volume/lang/add';
        var editLoad = $scope.url + 'volume/lang/modify';
        //Load列表
        var worldCtrlData = $resource($scope.url, {}, {
            load: {
                url: $scope.url + 'volume/lang/load',
                method: 'GET',
                isArray: false
            }
        });
        //根据语言类型和卷编号进行加载
        $scope.seeLang = function (lang) {
            console.log(lang);
            $scope.worldData.lang = lang;
            worldCtrlData.load({volumeNo: $scope.indexVolumeId, lang: lang}, function (resp) {
                if (!resp.success) {
                    $scope.upLoadBtn = false;
                    $scope.loadList = null;
                } else {
                    $scope.loadList = resp;
                    $scope.upLoadBtn = true;
                    console.log($scope.loadList)
                }
            });
        };
        $scope.seeLang($scope.worldData.lang);
        //第一次新增保存
        $scope.newUpData = function () {
            Upload.upload({
                url: upLoad,
                data: {
                    volumeId: $scope.indexId,
                    imgFile: $scope.worldData.file,
                    name: $scope.worldData.name,
                    title: $scope.worldData.title,
                    introduction: $scope.worldData.introduction,
                    description: $scope.worldData.description,
                    volumeNo: $scope.indexVolumeId,
                    caricatureTitle: $scope.worldData.caricatureTitle,
                    cgTitle: $scope.worldData.cgTitle,
                    lang: $scope.worldData.lang
                }
            }).then(function (resp) {
                    console.log(resp);
                    if (resp.success) {
                        //重新拉取列表
                        $scope.seeLang($scope.worldData.lang);
                    }
                }
            )
        };
        //编辑保存
        $scope.editUpData = function () {
            Upload.upload({
                url: editLoad,
                data: {
                    volumeId: $scope.indexId,
                    imgFile: $scope.loadList.result.file,
                    name: $scope.loadList.result.name,
                    title: $scope.loadList.result.title,
                    introduction: $scope.loadList.result.introduction,
                    description: $scope.loadList.result.description,
                    id: $scope.loadList.result.id,
                    caricatureTitle: $scope.loadList.result.caricatureTitle,
                    cgTitle: $scope.loadList.result.cgTitle,
                    lang: $scope.worldData.lang
                }
            }).then(function (resp) {
                    console.log(resp);
                    if (resp.data.success) {
                        $scope.seeLang($scope.worldData.lang);
                        $scope.spanShow = false;
                    }
                }
            )
        };
        $scope.daying = function () {
            console.log($scope.loadList.result.file)
        };
        //点击编辑后切换页面
        $scope.worldRedact = function () {
            $scope.spanShow = true;
        };
    }]);
