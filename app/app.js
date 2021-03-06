'use strict';

angular.module('myApp', [
  'ui.router',
  'ngSanitize',
  'summernote',
  'app.services.util',
  'myApp.apiServices',
  'app.filters',
  'myApp.appControllers',
  'ngFileUpload'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');            //没有匹配的路由的时候，跳转到一个默认的路径

    $stateProvider.state('home', {               //首页布局
      url: '/',
      views: {
        'header': {templateUrl: 'src/templates/header.html'},
        'body': {
          templateUrl: 'src/templates/homepageBody.html',
          controller: 'homepageCtrl'
        },
      }
    });
    $stateProvider.state('articalOne', {
      url: '/articalOne',
      views: {
        'header': {templateUrl: 'src/templates/header.html'},
        'body': {templateUrl: 'src/templates/articalOneBody.html'}
      }
    });
    $stateProvider.state('articalTwo', {               //
      url: '/articalTwo',
      views: {
        'header': {templateUrl: 'src/templates/header.html'},
        'body': {templateUrl: 'src/templates/articalTwoBody.html'}
      }
    });
    $stateProvider.state('artical_page', {               //
      params:{articalId:null},
      url: '/artical_page/:articalId',
      views: {
        'header': {templateUrl: 'src/templates/header.html'},
        'body': {
          templateUrl: 'src/templates/artical_page.html',
          controller: 'getArticalByIdCtrl'
        }
      }
    });

    $stateProvider.state('adminPage', {               //
      url: '/adminPage',
      views: {
        'header': {templateUrl: 'src/templates/header.html'},
        'body': {templateUrl: 'src/templates/adminPage.html'}
      }
    })
    $stateProvider.state('adminPage.list', {               //
      url: '/list',
      views: {
        'body': {
          templateUrl: 'src/templates/admin/adminPage-list.html',
          controller: 'listArticalsCtrl'
        }
      }
    })
    $stateProvider.state('adminPage.edit', {               //
      url: '/edit',
      views: {
        'body': {
          templateUrl: 'src/templates/admin/adminPage-edit.html',
          controller: 'addArticalsCtrl'
        }

      }
    })
    $stateProvider.state('adminPage.listImages', {               //
      url: '/listImages',
      views: {
        'body': {templateUrl: 'src/templates/admin/adminPage-listImages.html'}
      }
    })

  })



