angular.module('appService', [])
//相关的地址+ID的请求服务的封装，应用场景有删除、启用、禁用，
    .factory('postIdService', ['$rootScope', '$resource', 'MY', function ($rootScope, $resource, MY) {
        var apiUrl = MY.url;
        $rootScope.postIdTip = null;
        return {
            postIdRequest: function (address, id) {
                var postIdUrl = $resource(apiUrl + address, {}, {
                    postApply: {
                        url: apiUrl + address,
                        method: 'POST',
                        isArray: false
                    }
                });
                postIdUrl.postApply(apiUrl + address, {id: id}, function (resp) {
                    if (resp.success) {
                        $rootScope.postIdTip = resp;
                        $rootScope.$broadcast('postId.Service')
                    }
                });
            },
            //返回出去的提示
            postIdBackValue: function () {
                return $rootScope.postIdTip;
            }
        }
    }])
    //列表服务
    .factory('getListService', ['$rootScope', '$resource', 'MY', function ($rootScope, $resource, MY) {
        var listApi = MY.url;
        $rootScope.listLoad = new Object();
        return {
            getIdList: function (address, volumeNo, lang) {
                var getListResource = $resource(listApi + address, {}, {
                    getListApply: {
                        url: listApi + address,
                        method: 'GET',
                        isArray: false
                    }
                });
                getListResource.getListApply({volumeNo: volumeNo, lang: lang}, function (resp) {
                    if (resp.success) {
                        $rootScope.listLoad = resp.rows;
                        $rootScope.$broadcast('getListSuccess.Service')
                    }
                })
            },
            getIdListValue: function () {
                return $rootScope.listLoad;
            }
        }
    }])
    //请求volumeLangId的服务；
    .factory('volumeLangIdService', ['$rootScope', '$resource', 'MY', function ($rootScope, $resource, MY) {
        var apiUrl = MY.url;
        $rootScope.volumeLangId = null;
        return {
            //带一个状态值的服务；
            getVolumeLangId: function (volumeNo, lang) {
                var getListStatus = $resource(apiUrl + 'volume/lang/load', {}, {
                    postApply: {
                        url: apiUrl + 'volume/lang/load',
                        method: 'GET',
                        isArray: false
                    }
                });
                getListStatus.postApply({volumeNo: volumeNo, lang: lang}, function (resp) {
                    if (resp.success) {
                        $rootScope.volumeLangId = resp.result.id;
                        $rootScope.$broadcast('notifyVolumeLangId.Service')
                    }
                });
            },
            //返回出去的列表
            returnVolumeLangId: function () {
                return $rootScope.volumeLangId;
            }
        }
    }])
    .factory('upLoadVolume', ['$rootScope', 'MY', 'Upload', function ($rootScope, MY, Upload) {
        $rootScope.upLoadResult = null;
        return {
            upLoadCata: function (upDataUrl, upData) {
                Upload.upload({
                    url: upDataUrl,
                    data: upData
                }).then(function (resp) {
                    if (resp.success) {
                        $rootScope.upLoadResult = resp;
                        console.log(resp);
                        $rootScope.$broadcast('upLoad.service')
                    }
                })
            },
            upLoadCataTip: function () {
                return $rootScope.upLoadResult;
            }
        }
    }])

    .factory('dataListService', ['$rootScope', '$resource', 'MY', function ($rootScope, $resource, MY) {
        var apiUrl = MY.url;
        $rootScope.dataList = [];
        return {
            dataListUrl: function (address, postData) {
                var dataListCode = $resource(apiUrl + address, {}, {
                    postApply: {
                        url: apiUrl + address,
                        method: 'POST',
                        data: postData,
                        isArray: false
                    }
                });
                dataListCode.postApply(apiUrl + address, {data: postData}, function (resp) {
                    $rootScope.dataList = resp;
                });
                $rootScope.$broadcast('dataList.Service')
            },
            successList: function () {
                return $rootScope.dataList;
            }
        }
    }]);
