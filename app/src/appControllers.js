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
      }, {});
      $log.info($scope.articals)
    }
    $scope.deleteArtical = function (articalID,artical) {
      $scope.articals.splice( $scope.articals.indexOf(artical), 1);
      var deleteArticalResource = articalResource.getArticalResource('/artical/delete/:id');
      deleteArticalResource.delete({},
        {_id: articalID}, {}, {}
      );

    }
    $scope.listAllArticals();
  })


  .controller('hideNavCtrl', function ($scope) {
    $scope.data.visiable = false;
  })
  .controller('showNavCtrl', function ($scope) {
    $scope.data.visiable = true;
  })


