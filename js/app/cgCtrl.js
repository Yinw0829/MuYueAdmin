angular.module('cgCtrl', [])
// CG图例
    .controller('legendCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', 'dataListService', '$resource', 'MY', '$stateParams', function ($scope, $modal, $http, $timeout, $compile, Upload, dataListService, $resource, MY, $stateParams) {
        $scope.indexVolumeId = $stateParams.volumeId;
        $scope.indexId = $stateParams.id;
        console.log($scope.indexId);
        $scope.user = 'CG图例';
        $scope.valObj = $stateParams;
        console.log($scope.valObj);
        $scope.url = MY.url;
        var CgList = $resource($scope.url, {}, {
            getLeg: {
                url: $scope.url + 'volume/cg/list',
                method: 'GET',
                isArray: false,
                params: {volumeId: '@id'}
            }
        });
        CgList.getLeg({volumeId: $stateParams.id}, function (data) {
            $scope.LegList = data.rows;
            console.log($scope.LegList);
        });
        //删除
        $scope.del = function (id) {
            $scope.cancel1 = "删除CG图片";
            $scope.item = id;
            var modalInstance = $modal.open({
                templateUrl: 'views/model/delClick.html',
                controller: 'CGDelCtrl',
                scope: $scope,
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.item;

                    }
                }
            });
            modalInstance.result.then(function () {
                CgList.getLeg({volumeId: $stateParams.id}, function (data) {
                    $scope.LegList = data.rows;
                    console.log($scope.LegList);
                });
            })
        };
        // 新增CG图片
        $scope.newImg = function () {
            $scope.newadd = "新增CG图片";
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newCG.html',
                controller: 'CGCtrl',
                scope: $scope,
                size: 'lg',
                resolve: {
                    items: function () {
                        return $scope.indexId;

                    }
                }
            });
            modalInstance.result.then(function () {
                CgList.getLeg({volumeId: $stateParams.id}, function (data) {
                    $scope.LegList = data.rows;
                    console.log($scope.LegList);
                });
            })
        };
    }])
    // CG删除
    .controller('CGDelCtrl', ['$scope', '$modalInstance', 'items', '$resource', 'getListService', 'postIdService', function ($scope, $modalInstance, items, $resource, getListService, postIdService) {
        $scope.item = items;
        console.log($scope.item);
        $scope.using = function (resp) {
            console.log(resp);
            postIdService.postIdRequest('volume/cg/del', items);
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.close();
        };
        $scope.$on('postId.Service', function () {
            $scope.successMag = postIdService.postIdBackValue();
        });
    }])
    // CG新增
    .controller('CGCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', '$stateParams', 'items', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance, $stateParams, items) {
        console.log(items);
        var upLoadUrl = $scope.url + 'volume/cg/add';
        $scope.uploadImg = '';
        $scope.preserve = function () {
            $scope.submit($scope.file);
        };
        $scope.submit = function (file) {
            Upload.upload({
                url: upLoadUrl,
                data: {
                    imgFile: file,
                    title: $scope.title,
                    sort: $scope.sort,
                    volumeId: items
                }
            }).then(function (resp) {
                console.log(resp);
                $modalInstance.close()
            })
        }
    }])
