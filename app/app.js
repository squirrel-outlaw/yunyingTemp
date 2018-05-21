'use strict';

angular.module('myApp', ['ui.router', 'ngResource', 'ngSanitize'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');            //没有匹配的路由的时候，跳转到一个默认的路径

    $stateProvider.state('home', {               //首页布局
      url: '/',
      views: {
        'header': {templateUrl: 'src/templates/header.html'},
        'body': {
          templateUrl: 'src/templates/homepageBody.html',
          controller: 'showNavCtrl'
        },
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
    });
    $stateProvider.state('artical_page', {               //
      url: '/artical_page',
      views: {
        'header': {templateUrl: 'src/templates/header.html'},
        'body': {
          templateUrl: 'src/templates/artical_page.html',
          controller: 'hideNavCtrl'
        }
      }
    })
  })
  .constant('localDataUrl', 'temp_data/data.json')
  .constant('localDatabaseUrl', 'http://localhost:8888/')
  .controller('myCtrl', function ($scope, $http, $resource, $log, localDataUrl, $state) {
    var articalResource = $resource(localDataUrl, {}, {myGet: {method: 'get', isArray: true}});  //isArray表明从data.json引入的是数组不是对象
    articalResource.myGet({}, function (result) {
        $scope.articals = result;
      }, {}
    )

    var temoResource= $resource(localDatabaseUrl, {}, {myGet: {method: 'get', isArray: true}});  //isArray表明从data.json引入的是数组不是对象
    articalResource.myGet({}, function (result) {
        $scope.articals = result;
      }, {}
    )

    $scope.data = {
      visiable: true
    };
  })
  .controller('hideNavCtrl', function ($scope) {
    $scope.data.visiable = false;
  })
  .controller('showNavCtrl', function ($scope) {
    $scope.data.visiable = true;
  })


  .filter('trustHtml', function ($sce) {          //传入的字符串以html的形式进行解析并返回
    return function (input) {
      return $sce.trustAsHtml(input);
    }
  })
  .filter('clearHtml', function () {
    return function (input) {
      return input.replace(/<.*?>|&#12288;/g, '');
    }
  })


$(window).scroll(function () {
  $('#close-button').css('top', $(document).scrollTop() + $(window).height() - $('#test').height());
});

