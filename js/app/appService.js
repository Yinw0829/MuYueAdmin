angular.module('appService', [])
//相关的地址+ID的请求服务的封装，应用场景有删除、启用、禁用，
    .factory('postIdService', ['$rootScope', '$resource', 'MY', function ($rootScope, $resource, MY) {
        var apiUrl = MY.API;
        $rootScope.postIdTip = new Object();
        return {
            postIdRequest: function (address, recruitId) {
                var postIdUrl = $resource(apiUrl + address, {}, {
                    postApply: {
                        url: apiUrl + address,
                        method: 'POST',
                        isArray: false
                    }
                });
                postIdUrl.postApply(apiUrl + address, {recruitId: recruitId}, function (resp) {
                    $rootScope.postIdJudge = resp;
                });
                $rootScope.$broadcast('postId.Service')
            },
            //返回出去的提示
            postIdBackValue: function () {
                return $rootScope.postIdTip;
            }
        }
    }])
    //相关的列表请求服务的封装，应用场景所有只需要地址服务的,status为状态值；
    .factory('getListService', ['$rootScope', '$resource', 'MY', function ($rootScope, $resource, MY) {
        var apiUrl = MY.API;
        $rootScope.getListResult = [];
        return {
            //带一个状态值的服务；
            getListUrlStatus: function (address, status) {
                var getListStatus = $resource(apiUrl + address, {}, {
                    postApply: {
                        url: apiUrl + address,
                        method: 'GET',
                        params:{status: "@status"},
                        isArray: false
                    }
                });
                getListStatus.postApply(apiUrl + address, {status: status}, function (resp) {
                    $rootScope.getListResult = resp;
                });
                $rootScope.$broadcast('getUrlListStatus.Service')
            },
            //不带状态值的服务
            getListUrl:function (address) {
                var getList = $resource(apiUrl + address, {}, {
                    postApply: {
                        url: apiUrl + address,
                        method: 'GET',
                        isArray: false
                    }
                });
                getList.postApply(apiUrl + address, {}, function (resp) {
                    $rootScope.getListResult = resp;
                });
                $rootScope.$broadcast('getUrList.Service')
            },
            //返回出去的列表
            getListUrlBackValue: function () {
                return $rootScope.getListResult;
            }
        }
    }])
    .factory('dataListService',['$rootScope', '$resource', 'MY', function ($rootScope, $resource, MY){
        var apiUrl=MY.API;
        $rootScope.dataList = [];
        return{
            dataListUrl:function (address,postData) {
                var dataListCode = $resource(apiUrl + address,{},{
                    postApply:{
                        url:apiUrl + address,
                        method:'POST',
                        data:postData,
                        isArray:false
                    }
                });
                dataListCode.postApply(apiUrl + address,{data:postData},function (resp) {
                        $rootScope.dataList=resp;
                });
                $rootScope.$broadcast('dataList.Service')
            },
            successList:function () {
                return $rootScope.dataList;
            }
        }
    }]);