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

    $scope.jumpToAdmin = function () {
      $location.path('/admin_page');
    }

  })
  .controller('manageArticalCtrl', function ($scope, $log, articalResource) {
    $scope.artical = {title: ''};
    $log.info($scope.artical.title);
    var AddArticalResource = articalResource.getArticalResource('/artical/add')
    $scope.commit = function () {
      AddArticalResource.save('', {
        title: $scope.artical.title,
        from: $scope.artical.from,
        date: $scope.artical.date,
        content: $scope.artical.content
      })
    }
   var FindAllArticalResource = articalResource.getArticalResource('/artical/find/all')
   FindAllArticalResource.query({}, function (result) {
       $scope.yyy = result;
       $log.info($scope.yyy)
     }, {}
   )


  })




  .controller('hideNavCtrl', function ($scope) {
    $scope.data.visiable = false;
  })
  .controller('showNavCtrl', function ($scope) {
    $scope.data.visiable = true;
  })


