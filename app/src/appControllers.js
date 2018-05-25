'use strict';

angular.module('myApp.appControllers', [
  'myApp.apiServices'
])
  .controller('myCtrl', function ($scope, $log, fetchArticals,remoteResource) {
    var articalResource = fetchArticals;
    articalResource.myGet({}, function (result) {
        $scope.articals = result;
      }, {}
    )


    $scope.data = {
      visiable: true
    };

    $scope.artical = {};
    $scope.articals = [];

    $scope.articalsResource=remoteResource.getRemoteResource('/articals/:id');
    //REST风格的.query会对远程接口生成如/articals，Request Method:GET的请求
    $scope.listAllArticals = function () {
      $scope.articals=$scope.articalsResource.query();
    }
    $scope.addArtical = function (artical) {
      new $scope.articalsResource(artical).$save().then(function (newArtical) {
        $scope.articals.push(newArtical);
      });
    }
    $scope.deleteArtical = function (artical) {
      //跨域请求生成Request Method:OPTIONS，Request Method:DELETE两条请求，删除本地文章必须放在前面才能实时在本地页面响应
      $scope.articals.splice($scope.articals.indexOf(artical), 1);
      artical.$delete();
    }
    $scope.listAllArticals();
  })

  .controller('hideNavCtrl', function ($scope) {
    $scope.data.visiable = false;
  })
  .controller('showNavCtrl', function ($scope) {
    $scope.data.visiable = true;
  })


