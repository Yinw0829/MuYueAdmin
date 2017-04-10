angular.module('userCtrl', [])
// 卷管理
//     .controller('volManageCtrl', ['$scope', '$modal','$http', '$timeout', '$compile', 'Upload', 'dataListService', '$resource', 'MY', function ($scope, $modal,$http, $timeout, $compile, Upload, dataListService, $resource, MY) {
//         $scope.url = MY.url + 'volume/';
//         var volUrl={
//             volLoad:'load'
//         };
//         var getVol = $resource(
//             $scope.url + ':type',
//             {
//                 lang:'@lang',
//                 type:'@type',
//                 volumeNo:'@volumeNo'
//             },{
//                 loadList:{url:$scope.url+volUrl.volLoad,method:'get',params:{type:'@type'},isArray:false}
//             }
//         );
//
//
//         getVol.get({type:'list'},function (resp) {
//             $scope.volList = resp.rows;
//             console.log($scope.volList);
//         });
//         // 新增卷
//         // $scope.newLay = function () {
//         //     var Userload = $resource(
//         //         $scope.url + 'add',
//         //         {},
//         //         {newAdd: {method: 'POST', isArray: false}});
//         //     $scope.newadd = "新增卷";
//         //     var volumeNo = function () {
//         //
//         //     };
//         //     if (i=total.length)
//         //     Userload.newAdd({
//         //         data:{
//         //             type:"NORMAL",
//         //             volumeNo: $scope.volumeNo,
//         //             sort: $scope.sort
//         //         }
//         //     }).success(function(data){
//         //         if (data.success){
//         //             console.log(data.msg);
//         //             console.log(data);
//         //             // $modalInstance.close();
//         //         }
//         //     })
//         // };
//         $scope.newLay = function () {
//             $scope.newadd = "新增卷";
//             var modalInstance = $modal.open({
//                 templateUrl: 'views/model/newList.html',
//                 controller: 'newListCtrl',
//                 scope: $scope,
//                 size: 'lg'
//             });
//             modalInstance.result.then(function () {
//                 getVol.get({type:'list'},{},function (data) {
//                     $scope.volList = data.rows;
//                 });
//             });
//         };
//         // 编辑
//         $scope.compile = function (volumeNo) {
//             console.log(volumeNo);
//             getVol.loadList({type:'NORMAL'},{volumeNo:volumeNo},function (resp) {
//                 $scope.item = resp.result;
//                 console.log($scope.item);
//             });
//             $scope.newcomp = "编辑卷";
//             var modalInstance = $modal.open({
//                 templateUrl: 'views/model/newComp.html',
//                 controller: 'newCompCtrl',
//                 scope: $scope,
//                 size: 'lg',
//                 resolve:{
//                     items:function () {
//                         return $scope.item;
//                     }
//         }});
//             modalInstance.result.then(function () {
//                 getVol.get({type:'list'},{},function (data) {
//                     $scope.volList = data.rows;
//                 });
//             })
//         };
//         // 删除
//         $scope.delClick = function (items) {
//             $scope.cancel1 = '卷删除';
//             console.log(items);
//             $scope.item = items;
//             console.log($scope.item);
//             var modalInstance = $modal.open({
//                 templateUrl: 'views/model/delClick.html',
//                 controller: 'delvolCtrl',
//                 scope: $scope,
//                 size: 'lg',
//                 resolve:{
//                     items:function () {
//                         return $scope.item;
//                     }
//                 }
//             });
//         }
//     }])
//     // 新增卷
//     .controller('newListCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance) {
//         var Userload = $resource(
//             $scope.url + 'add',
//             {},
//             {newAdd: {method: 'POST', isArray: false}});
//         $scope.keep = function (files) {
//             // $scope.fileInfo = files;
//             Userload.save({
//                     type:"NORMAL",
//                     volumeNo: $scope.volumeNo,
//                     sort: $scope.sort
//                 }, function (msg) {
//                     console.log(msg);
//                 $modalInstance.close();
//
//                 }
//             )
//         }
//         // var newAdd = $resource($scope.url + 'add');
//         // $scope.uploadImg = '';
//         // $scope.preserve = function () {
//         //     $scope.load($scope.files)
//         // };
//         // $scope.load = function (files) {
//         //     $scope.fileInfo = files;
//         //     console.log(files);
//         //     Upload.load({
//         //         // method:'POST',
//         //         // url:'add',
//         //         data:{
//         //             title:$scope.title,
//         //             imgFile:files,
//         //             name:$scope.name,
//         //             sort:$scope.sort,
//         //             description:$scope.description,
//         //             catenate:$scope.catenate
//         //         }
//         //     }, function () {
//         //         $modalInstance.close();
//         //     })
//         // }
//     }])
//     // 编辑卷
//     .controller('newCompCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance','items', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance,items) {
//         $scope.add = items;
//         var redact = $resource($scope.url + 'xmodify');
//         $scope.keep = function (id) {
//             redact.save({
//                 id:$scope.item.volumeNo,
//                 type:"NORMAL",
//                 volumeNo: $scope.item.volumeNo,
//                 sort: $scope.item.sort,
//                 disabled:"true"
//                 }, function (msg) {
//                     console.log(msg);
//                 $modalInstance.close();
//                 }
//             )
//         }
//         // var newAdd = $resource($scope.url + 'add');
//         // $scope.uploadImg = '';
//         // $scope.preserve = function () {
//         //     $scope.load($scope.files)
//         // };
//         // $scope.load = function (files) {
//         //     $scope.fileInfo = files;
//         //     console.log(files);
//         //     Upload.load({
//         //         // method:'POST',
//         //         // url:'add',
//         //         data:{
//         //             title:$scope.title,
//         //             imgFile:files,
//         //             name:$scope.name,
//         //             sort:$scope.sort,
//         //             description:$scope.description,
//         //             catenate:$scope.catenate
//         //         }
//         //     }, function () {
//         //         $modalInstance.close();
//         //     })
//         // }
//     }])
//     // 卷删除
//     .controller('delvolCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
//         var firstDel = $resource($scope.url + '/lang/del');
//         $scope.using = function (id) {
//             firstDel.save({id:id}, function (msg) {
//                 console.log(msg);
//                 $modalInstance.close();
//             })
//         };
//         $scope.cancel = function () {
//             $modalInstance.close();
//         }
//     }])
    // 首页管理
    .controller('indexCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', 'dataListService', '$resource', 'MY', function ($scope, $modal, $http, $timeout, $compile, Upload, dataListService, $resource, MY) {
        $scope.url = MY.url + 'volume/list';
        var getList = $resource(
            $scope.url,
            {},
            {}
        );
      getList.get({type:'list'},function (data) {
          $scope.volList = data.rows;
          console.log($scope.volList);
      });
      $scope.url = MY.url +'caricature/';
        var getUser = $resource(
            $scope.url + ':type',
            {
                id: '@id'
            }, {});
        getUser.get({type: 'list'}, {}, function (data) {
            $scope.userList = data.rows;
        });
        // 新增
        $scope.indecCtrl = 'indexCtrl';
        $scope.newLay = function () {
            $scope.newadd = "新增首页";
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newLayout.html',
                controller: 'homeCtrl',
                scope: $scope,
                size: 'lg'
            });
        };
        // 查看
        $scope.seeClick = function (id) {
            $scope.see = "首页详细";
            getUser.get({type: 'load'}, {id: id}, function (data) {
                $scope.item = data.rows;
            });
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newSeeLayout.html',
                controller: 'seeCtrl',
                scope: $scope,
                size: 'lg',
                reslove: {
                    items: function () {
                        return $scope.item;
                    }
                }
            });
        };
        // 编辑
        $scope.compile = function () {
            $scope.redact1 = "首页编辑";
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
            })
        }
    }])
    //首页新增
    .controller('homeCtrl', ['$scope', '$timeout', 'Upload', 'dataListService', '$resource', '$modalInstance', function ($scope, $timeout, Upload, dataListService, $resource, $modalInstance) {
        var Userload = $resource(
            $scope.url + 'add',
            {},
            {newAdd: {method: 'POST', isArray: false}});
        // Userload.newAdd();
        // console.log(Userload.newAdd);
        $scope.uploadImg='';
        // $scope.load = function () {
        //     $scope.load($scope.files)
        // };
        $scope.preserve = function (files) {
            $scope.fileInfo = files;
            Userload.save({
                    imgFile:$scope.files,
                    title: $scope.title,
                    name: $scope.name,
                    sort: $scope.sort,
                    description: $scope.description,
                    volumeNo:$scope.volumeNo
                    // catenate:$scope.catenate
                }, function (msg) {
                    console.log(msg);
                    $modalInstance.close();
                }
            )
        }
        // var newAdd = $resource($scope.url + 'add');
        // $scope.uploadImg = '';
        // $scope.preserve = function () {
        //     $scope.load($scope.files)
        // };
        // $scope.load = function (files) {
        //     $scope.fileInfo = files;
        //     console.log(files);
        //     Upload.load({
        //         // method:'POST',
        //         // url:'add',
        //         data:{
        //             title:$scope.title,
        //             imgFile:files,
        //             name:$scope.name,
        //             sort:$scope.sort,
        //             description:$scope.description,
        //             catenate:$scope.catenate
        //         }
        //     }, function () {
        //         $modalInstance.close();
        //     })
        // }
    }])
    //首页删除
    .controller('delCtrl', ['$scope', '$modalInstance', 'items', '$resource', function ($scope, $modalInstance, items, $resource) {
        var firstDel = $resource(
            $scope.url + '/del',
            {id: "@id"},
            {dataDelete: {method: 'POST', isArray: false}});
        $scope.using = function (id) {
            firstDel.dataDelete({id: id}, function () {
                $modalInstance.close();
            })
        };
        $scope.cancel = function () {
            $modalInstance.close();
        }
    }])
    //首页查看
    .controller('seeCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
        $scope.ok = function (Id) {
            $modalInstance.close(items)
        }
    }])
    //首页编辑
    .controller('redactCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
        var redact = $resource($scope.url + 'modify');
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
    .controller('figureCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', 'dataListService', '$resource', 'MY','$stateParams', function ($scope, $modal, $http, $timeout, $compile, Upload, dataListService, $resource, MY,$stateParams) {
        $scope.user = '人物';
        $scope.url = MY.url + '/volume/lang/caricature/';
        var getFigure =  $resource(
            $scope.url + ':type',
            {
                volumeLangId:'@volumeLangId'
            },{}
        );
        getFigure.get({type:'list'},{volumeLangId:$stateParams.volumeLangId},function (data) {
            $scope.FigureList = data.rows;
        });
        $scope.newFigure = function () {
            $scope.newadd = "新增人物";
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newFigure.html',
                controller: 'figurewCtrl',
                scope: $scope,
                size: 'lg'
            });
        };
        // $scope.uploadFiles = function (files, errFiles) {
        //     $scope.files = files;
        //     console.log(files);
        //     $scope.errFiles = errFiles;
        //     //url是图片上传的接口，data是post的数据
        //     angular.forEach(files, function (file) {
        //         console.log('选择完成图片所触发的事件');
        //         file.upload = Upload.upload({
        //             //图片上传的API；
        //             url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        //             //以及POST的数据；
        //             data: {file: file}
        //         });
        //         file.upload.then(function (response) {
        //             $timeout(function () {
        //                 file.result = response.data;
        //             });
        //         }, function (response) {
        //             if (response.status > 0)
        //                 $scope.errorMsg = response.status + ': ' + response.data;
        //         }, function (evt) {
        //             file.progress = Math.min(100, parseInt(100.0 *
        //                 evt.loaded / evt.total));
        //         });
        //     });
        // }
    }])
    //人物新增
    .controller('figurewCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
        var Uload = $resource($scope.url + 'add',
            {},
            {newFigure:{method:'POST',isArray:false}});
        $scope.uploadImg = '';
        $scope.load = function () {
            $scope.load($scope.files)
        };
        $scope.click = function () {
            $scope.click($scope.files2)
        };
        $scope.preserve = function (files,files2) {
            Uload.save({
                    avatorFile: $scope.files,
                    imgFile: $scope.files2,
                    title: "这是标题标题",
                    sort: $scope.sort,
                    description: $scope.description
                    // catenate:$scope.catenate
                }, function (msg) {
                    console.log(msg);
                    $modalInstance.close();
                }
            )
        }
        // $scope.first = function (files) {
        //     $scope.fileInfo = files;
        //     first.save({
        //         method: 'POST',
        //         url: 'add',
        //         data: {
        //             title:title,
        //             imgFile: imgFile,
        //             avatorFile: avatorFile,
        //             sort: $scope.sort,
        //             description: $scope.description
        //         }
        //     }, function () {
        //         $modalInstance.close();
        //     })
        // }
    }])
    //    CG图例
    .controller('legendCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', 'dataListService', '$resource', 'MY', '$stateParams', function ($scope, $modal, $http, $timeout, $compile, Upload, dataListService, $resource, MY, $stateParams) {
        $scope.user = 'CG图例';
        $scope.url = MY.url + 'volume/cg/';
        var cutLine = $resource(
            $scope.url + ':type',
            {volumeId: '@volumeId'}, {}
        );
        cutLine.get({type: 'list'}, {volumeId: $stateParams.volumeId}, function (data) {
            $scope.LineList = data.rows;
            console.log($scope.LineList);
        });
        // $scope.submit = function () {
        //     if ($scope.form.file.$valid && $scope.file) {
        //         $scope.uploadFile($scope.file);
        //     }
        // };
        $scope.uploadFiles = function (files) {
            $scope.files = files;
            console.log(files);
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    Upload.upload({
                        url:'http://localhost:8087/MuYUeAdmin/api/volume/cg/add',
                        // method:'POST',
                        data: {file: files[i],volumeId:$stateParams.volumeId}});
                }
            }
        };
        // $scope.uploadFile = function (file) {
        //     console.log(file);
        //     console.log('选择完成图片所触发的事件');
        //     Upload.upload = Upload.upload({
        //         //图片上传的API；
        //         url: 'http://121.40.226.241:8080/muyue/volume/cg/add ',
        //         //以及POST的数据；
        //         // data: {volumeId: $stateParams.volumeId,imgFile:file}
        //         data: {file: file}
        //     });
        //     file.upload.then(function (response) {
        //         $timeout(function () {
        //             file.result = response.data;
        //         });
        //     }, function (response) {
        //         if (response.status > 0)
        //             $scope.errorMsg = response.status + ': ' + response.data;
        //     }, function (evt) {
        //         file.progress = Math.min(100, parseInt(100.0 *
        //             evt.loaded / evt.total));
        //     });
        // }
    }])
    //    目录
    .controller('catalogCtrl', ['$scope', '$modal', '$http', '$timeout', '$compile', 'Upload', 'dataListService', '$resource','$stateParams','MY', function ($scope, $modal, $http, $timeout, $compile, Upload, dataListService, $resource,$stateParams,MY) {
        $scope.user = '目录';
        // dataListService.dataListUrl(address, postData);
        // $scope.on('dataList.Service', function () {
        //     $scope.list = dataListService.successList
        // });

        // 新增
        $scope.url = MY.url+ 'volume/lang/menu/';
        var getCata = $resource(
            $scope.url+':type',
            {
                volumeLangId:'@volumeLangId'
            },{}
        );
        getCata.get({type:'list'},{volumeLangId:$stateParams.volumeLangId},function (data) {
            $scope.CataList = data.rows;
        });
        $scope.newCata = function () {
            $scope.name = '新增目录';
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newlyCatalog.html',
                controller: 'newLayCtrl',
                scope: $scope,
                size: 'lg'
            });
        };
        // 编辑
        $scope.redact = function () {
            $scope.name = '编辑内容';
            var modalInstance = $modal.open({
                templateUrl: 'views/model/newlyCatalog.html',
                controller: 'checkLayCtrl',
                scope: $scope,
                size: 'lg'
            })
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
    //新增
    .controller('newLayCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
        var first = $resource($scope.url + 'add');
        $scope.first = function (id) {
            first.save({name: name, id: id}, function () {
                $modalInstance.close();
            })
        }
    }])
    //目录编辑
    .controller('checkLayCtrl', ['$scope', '$modalInstance', '$resource', function ($scope, $modalInstance, $resource) {
        var first = $resource($scope.url + 'add');
        $scope.first = function (id) {
            first.save({name: name, id: id}, function () {
                $modalInstance.close();
            })
        }
    }]);