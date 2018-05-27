'use strict';

angular.module('myApp.appControllers', [
  'myApp.apiServices',
  'ngFileUpload'
])
  .controller('myCtrl', function ($scope) {
    $scope.data = {
      visiable: true
    };
  })

  .controller('listArticalsCtrl', function ($scope, $log, fetchArticals, remoteResource, Upload, $timeout) {
    var articalResource = fetchArticals;
    articalResource.myGet({}, function (result) {
        $scope.articals = result;
      }, {}
    )

    $scope.artical = {};
    $scope.articals = [];

    $scope.articalsResource = remoteResource.getRemoteResource('/articals/:id');
    //REST风格的.query会对远程接口生成如/articals，Request Method:GET的请求
    $scope.listAllArticals = function () {
      $scope.articals = $scope.articalsResource.query();
    }
    $scope.addArtical = function (artical) {
      new $scope.articalsResource(artical).$save().then(function (newArtical) {
        $scope.articals.push(newArtical);
      });
    }
    $scope.deleteArtical = function (artical) {
      //跨域请求生成Request Method:OPTIONS，Request Method:DELETE两条请求，删除本地文章必须放在前面才能实时在本地页面响应
      $scope.articals.splice($scope.articals.indexOf(artical), 1);
      artical.$delete().then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
      });
    }
    $scope.listAllArticals();


    $scope.summernoteOptions = {
      height: 1000,
      focus: true,
      lang: 'zh-CN',
      callbacks: {
        onImageUpload: function (files) {    //回调函数，当在summernote里面出现添加图片的动作，此函数被调用，无需在标签内添加on-image-upload
          var data = new FormData();
          data.append('file', files[0]);   //以file为键把files[0]添加到data里面，只能通过data.get('file')来获取files[0]，有点类似POJO的访问方式
          $.ajax({                         //file字段是必须的，后端的MultipartFile根据此字段来获取内容
            data: data,
            type: "POST",
            url: "http://localhost:8888/images/upload",
            cache: false,
            contentType: false,
            processData: false,
            success: function (url) {
              $('.summernote').summernote('editor.insertImage', url);
            }
          });
        }
      }
    };

  })

  .controller('listImagesCtrl', function ($scope, $log, fetchArticals, remoteResource, Upload, $timeout) {
    $scope.image = {};
    $scope.images = [];

    $scope.imagessResource = remoteResource.getRemoteResource('/images/:id');
    //REST风格的.query会对远程接口生成如/images，Request Method:GET的请求
    $scope.listAllimages = function () {
      $scope.images = $scope.imagessResource.query();
    }
    $scope.addImage = function (image) {
      new $scope.imagessResource(image).$save().then(function (newImage) {
        $scope.images.push(newImage);
      });
    }
    $scope.deleteImage = function (image) {
      //跨域请求生成Request Method:OPTIONS，Request Method:DELETE两条请求，删除本地文章必须放在前面才能实时在本地页面响应
      $scope.images.splice($scope.images.indexOf(image), 1);
      image.content='';
      image.$delete();/////////////////////
    }
    $scope.listAllimages();

  })


  .controller('hideNavCtrl', function ($scope) {
    $scope.data.visiable = false;
  })
  .controller('showNavCtrl', function ($scope) {
    $scope.data.visiable = true;
  })



