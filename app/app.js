'use strict';

angular.module('myApp', ['ui.router', 'ngResource','ngSanitize'])
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
    $stateProvider.state('artical_page', {               //
      url: '/artical_page',
      templateUrl: 'src/templates/artical_page.html'
    })



  })
  .constant('localDataUrl', 'temp_data/data.json')
  .controller('myCtrl', function ($scope, $http, $resource, $log, localDataUrl) {
    var articalResource = $resource(localDataUrl, {}, {myGet: {method: 'get', isArray: true}});  //isArray表明从data.json引入的是数组不是对象
    articalResource.myGet({}, function (result) {
        $scope.articals = result;
        $log.info('111')
      }, {}
    )
  })
  .filter('trustHtml', function ($sce) {          //传入的字符串以html的形式进行解析并返回
    return function (input) {
      return $sce.trustAsHtml(input);
    }
  });





