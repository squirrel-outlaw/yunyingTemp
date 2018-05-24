'use strict';

angular.module('myApp.appControllers', [
  'myApp.apiServices'
])
  .controller('myCtrl', function ($scope, $log, $location, fetchArticals) {
    var articalResource = fetchArticals;
    articalResource.myGet({}, function (result) {
        $scope.articals = result;
      }, {}
    )

    // $scope.tempResource = $resource(localDatabaseUrl + '/1');  //isArray表明从data.json引入的是数组不是对象

    //$scope.articals = $scope.tempResource.query(function (data) {
    //   return data

    //  });
    $log.info($scope.articals);
    $log.info($scope.text);

    $scope.data = {
      visiable: true
    };

    $scope.jumpToTargetPage = function (target) {
      $location.path(target);
    }

  })
  .controller('manageArticalCtrl', function ($scope, $log, articalResource) {
    $scope.artical = {};
    $scope.articals = [];
    $scope.commit = function () {
      var addArticalResource = articalResource.getArticalResource('/artical/add');
      addArticalResource.save('', {
        title: $scope.artical.title,
        from: $scope.artical.from,
        date: $scope.artical.date,
        content: $scope.artical.content
      })
    }
    $scope.listAllArticals = function () {
      var findAllArticalResource = articalResource.getArticalResource('/artical/find/all');
      findAllArticalResource.query({}, function (result) {
        $scope.articals = result;
      }, {})
    }
    $scope.deleteArtical = function (arttical) {
      var deleteArticalResource = articalResource.getArticalResource('/artical/delete/{:id}');
      deleteArticalResource.remove({}, {
        id: articalID
      }, {}, {})
    }

  })


  .controller('hideNavCtrl', function ($scope) {
    $scope.data.visiable = false;
  })
  .controller('showNavCtrl', function ($scope) {
    $scope.data.visiable = true;
  })


