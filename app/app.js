'use strict';

angular.module('myApp', ['ui.router', 'ngResource'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');            //没有匹配的路由的时候，跳转到一个默认的路径

    $stateProvider.state('home', {               //首页布局
      url: '/',
      views: {
        'header': {templateUrl: 'src/templates/header.html'},
        'body': {templateUrl: 'src/templates/homepageBody.html'},
      }
    });
    $stateProvider.state('articalOne', {
      url: '/articalOne',
      views: {
        'header': {templateUrl: 'src/templates/header.html'},
        'body': {templateUrl: 'src/templates/articalOneBody.html'},
      }
    });
    $stateProvider.state('articalTwo', {               //
      url: '/articalTwo',
      views: {
        'header': {templateUrl: 'src/templates/header.html'},
        'body': {templateUrl: 'src/templates/articalTwoBody.html'},
      }
    })
  })
  .constant('localDataUrl', 'temp_data/data.json')
  .controller('myCtrl', function ($scope, $http, $resource, localDataUrl) {
    $scope.articalResource = $resource(localDataUrl);
    $scope.articalResource.get({}, function (result) {
      $scope.artical=result;
      console.log($scope.artical.image)
    }, function (d) {
      console.log(d)
    })

  })



