/**
 * Created by yinwei on 2017/4/19.
 */
angular.module('indexCtrl', [])
    .controller('volManageCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', 'dataListService', '$resource', 'MY', function ($scope, $modal, $http, $timeout, $compile, Upload, dataListService, $resource, MY) {
        $scope.url = MY.url;
        var getList = $resource($scope.url, {}, {
            volList: {
                url: $scope.url + 'volume/list',
                method: 'GET',
                isArray: false,
                params: {type: '@type'}
            },
            addVol: {
                url: $scope.url + 'volume/add',
                method: 'POST',
                isArray: false
            }
        });
        // getList.volList({type:'NORMAL'},function (resp) {
        //     console.info('普通卷：');
        //     console.log(resp);
        // });
        getList.volList(function (resp) {
            $scope.volList = resp.rows;
            console.log(resp)

        });
        //新增卷-普通卷
        $scope.newLay = function () {
            getList.volList({type: 'NORMAL'}, function (resp) {
                if (resp.success) {
                    getList.addVol(
                        {
                            //普通"NORMAL" 推荐"RECOMMEND" 其他 "OTHER"
                            type: "OTHER",
                            volumeNo: 14,
                            sort: 14,
                            disabled: true
                        }, function (msg) {
                            console.log(msg)
                        })
                }
            });
        };
    }])
    // 首页管理
    .controller('indexCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', '$resource', '$rootScope', 'MY', function ($scope, $modal, $http, $timeout, $compile, Upload, $resource, $rootScope, MY) {
        $scope.url = MY.url;
        var getList = $resource($scope.url, {}, {
            getUser: {
                url: $scope.url + 'caricature/list',
                method: 'GET',
                isArray: false,
                params: {type: '@type'}
            },
            getFirst: {
                url: $scope.url + 'caricature/list',
                method: 'GET',
                isArray: false,
                params: {lang: '@lang'}
            },
            catList: {
                url: $scope.url + 'volume/list',
                method: 'GET',
                isArray: false
            },
            seeList: {
                url: $scope.url + 'caricature/load',
                method: 'GET',
                isArray: false,
                params: {id: '@id'}
            },
            imgList: {
                url: $scope.url + 'img',
                method: 'GET',
                isArray: false,
                params: {path: '@path'}
            }
        });
        //首页中文列表
        getList.getFirst({lang: 'zh_ch'}, function (resp) {
            $scope.FistList = resp.rows;
            console.log($scope.FistList);
        });
        //首页繁体列表
        getList.getFirst({lang: 'zh_tw'}, function (resp) {
            $scope.TwList = resp.rows;
            console.log($scope.TwList);
        });
        //首页英文列表
        getList.getFirst({lang: 'en'}, function (resp) {
            $scope.EnList = resp.rows;
            console.log($scope.EnList);
        });
        // 所有卷列表
        getList.catList(function (resp) {
            $rootScope.normalList = resp.rows;
            console.log($rootScope.normalList)
        });
        // 卷列表
        getList.getUser({type: 'NORMAL'}, function (resp) {
            console.info('普通卷：');
            console.log(resp);
        });

        // 中文新增
        $scope.indecCtrl = 'indexCtrl';
        $scope.newLay = function () {
            $scope.newadd = "新增首页";
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newLayout.html',
                controller: 'homeCtrl',
                scope: $scope,
                size: 'lg'
            });
            modalInstance.result.then(function () {
                getList.getFirst({lang: 'zh_ch'}, function (resp) {
                    $scope.FistList = resp.rows;
                    console.log($scope.FistList);
                });
            })
        };
        // 繁体新增
        $scope.newLay = function () {
            $scope.newadd = "新增首页";
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newLayout.html',
                controller: 'TwhomeCtrl',
                scope: $scope,
                size: 'lg'
            });
            modalInstance.result.then(function () {
                getList.getFirst({lang: 'zh_tw'}, function (resp) {
                    $scope.TwList = resp.rows;
                    console.log($scope.TwList);
                });
            })
        };
        // 英文新增
        $scope.newLay = function () {
            $scope.newadd = "新增首页";
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newLayout.html',
                controller: 'EnhomeCtrl',
                scope: $scope,
                size: 'lg'
            });
            modalInstance.result.then(function () {
                getList.getFirst({lang: 'en'}, function (resp) {
                    $scope.EnList = resp.rows;
                    console.log($scope.EnList);
                });
            })
        };
        // 查看
        $scope.seeClick = function (id) {
            console.log(id);
            $scope.see = "首页详细";
            getList.seeList({id: id}, function (resp) {
                $scope.item = resp.result;
                console.log(resp.result);
            });
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newSeeLayout.html',
                controller: 'seeCtrl',
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
        $scope.delClick = function (items) {
            console.log(items);
            $scope.item = items;
            $scope.cancel1 = "首页删除";
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
            });
            modalInstance.result.then(function () {
                getList.getFirst({lang: 'zh_tw'}, function (resp) {
                    $scope.TwList = resp.rows;
                    console.log($scope.TwList);
                });
            });
            modalInstance.result.then(function () {
                getList.getFirst({lang: 'zh_ch'}, function (resp) {
                    $scope.FistList = resp.rows;
                    console.log($scope.FistList);
                });
            });
            modalInstance.result.then(function () {
                getList.getFirst({lang: 'en'}, function (resp) {
                    $scope.EnList = resp.rows;
                    console.log($scope.EnList);
                });
            })
        };
        // 编辑
        $scope.reductClick = function (id) {
            $scope.item = id;
            getList.seeList({id: id}, function (resp) {
                $scope.group = resp.result;
                console.log($scope.group)
            });
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
            modalInstance.result.then(function () {
                getList.getFirst({lang: 'zh_ch'}, function (resp) {
                    $scope.FistList = resp.rows;
                    console.log($scope.FistList);
                });
            });
            modalInstance.result.then(function () {
                getList.getFirst({lang: 'zh_tw'}, function (resp) {
                    $scope.TwList = resp.rows;
                    console.log($scope.TwList);
                });
            });
            modalInstance.result.then(function () {
                getList.getFirst({lang: 'en'}, function (resp) {
                    $scope.EnList = resp.rows;
                    console.log($scope.EnList);
                });
            })
        };

    }])
    //首页中文新增
    .controller('homeCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance) {
        var upLoadUrl = $scope.url + 'caricature/add';
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
                    description: $scope.description,
                    volumeNo: $scope.volumeNo,
                    lang: 'zh_ch'
                }
            }).then(function (resp) {
                console.log(resp);
                $modalInstance.close()
            })
        }
    }])
    // 首页繁体新增
    .controller('TwhomeCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance) {
        var upLoadUrl = $scope.url + 'caricature/add';
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
                    description: $scope.description,
                    volumeNo: $scope.volumeNo,
                    lang: 'zh_tw'
                }
            }).then(function (resp) {
                console.log(resp);
                $modalInstance.close()
            })
        }
    }])
    // 首页英文新增
    .controller('EnhomeCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance) {
        var upLoadUrl = $scope.url + 'caricature/add';
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
                    description: $scope.description,
                    volumeNo: $scope.volumeNo,
                    lang: 'en'
                }
            }).then(function (resp) {
                console.log(resp);
                $modalInstance.close()
            })
        }
    }])
    //首页删除
    .controller('delCtrl', ['$scope', '$modalInstance', 'items', '$resource', 'postIdService', function ($scope, $modalInstance, items, $resource, postIdService) {
        $scope.using = function () {
            postIdService.postIdRequest('caricature/del', items);
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.close();
        };
        $scope.$on('postId.Service', function () {
            $scope.successMag = postIdService.postIdBackValue();
        });
    }])
    // //首页查看
    .controller('seeCtrl', ['$scope', '$modalInstance', '$resource', 'items', function ($scope, $modalInstance, $resource, items) {
        $scope.ok = function (id) {
            $modalInstance.close(items)
        }
    }])
    //首页编辑
    .controller('redactCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', 'items', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance, items) {
        console.log(items);
        $scope.redact1 = "首页编辑";
        var upLoadUrl = $scope.url + 'caricature/modify';
        $scope.uploadImg = '';
        $scope.preserve = function () {
            $scope.submit($scope.file);
        };
        $scope.submit = function (file) {
            if ($scope.file == undefined) {
                Upload.upload({
                    url: upLoadUrl,
                    data: {
                        id: $scope.group.id,
                        title: $scope.group.title,
                        sort: $scope.group.sort,
                        description: $scope.group.description,
                        volumeNo: $scope.group.volumeNo,
                        lang: 'zh_ch'
                    }
                }).then(function (resp) {
                    console.log(resp);
                    $modalInstance.close()
                })
            } else {
                Upload.upload({
                    url: upLoadUrl,
                    data: {
                        id: $scope.group.id,
                        imgFile: file,
                        title: $scope.group.title,
                        sort: $scope.group.sort,
                        description: $scope.group.description,
                        volumeNo: $scope.group.volumeNo,
                        lang: 'zh_ch'
                    }
                }).then(function (resp) {
                    console.log(resp);
                    $modalInstance.close()
                })
            }
        };
    }])
