'use strict';

angular.module('myApp.appControllers', [
  'myApp.apiServices',
  'ngFileUpload',
  'app.services.util'
])
  .controller('myCtrl', function ($scope) {
    $scope.data = {
      visiable: true
    };
  })

  .controller('listArticalsCtrl', function ($scope, $log, articalResource, Upload, $timeout,aliyunOSS) {
    $scope.artical = {};
    $scope.articals = [];
    $scope.articalsResource = articalResource;
    //REST风格的.query会对远程接口生成如/articals，Request Method:GET的请求,并且返回的数组对象
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

    console.log(aliyunOSS.list())


  })

  .controller('listImagesCtrl', function ($scope, $log, imageResource, Upload, $timeout) {
    $scope.image = {};
    $scope.images = [];

    $scope.imagessResource = imageResource;
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
      $scope.imagessResource.delete({id: image.id}, function (response) {
        console.log(response)
      })


      // image.content='';//$resource的服务$delete会把image的内容也插入到HTTP的请求体，因为图片比较大，故先把content清空，
      // image.$delete();  // 服务器端根据图片的id来进行删除
    }
    $scope.listAllimages();

  })

  .controller('uploadImages', function ($scope, Upload, aliYunImageUrl) {
    $scope.upload = function (file) {
      Upload.upload({
        url: aliYunImageUrl,
        data: {file: file}
      }).then(
        function (resp) {
          $scope.imageRemoteUrl = "http:"+resp.data.url
          console.log($scope.imageRemoteUrl)


        }
        , function (resp) {
          console.log('Error status: ' + resp.status);
          console.log(resp);
        }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };


  })

  .controller('hideNavCtrl', function ($scope) {
    $scope.data.visiable = false;
  })
  .controller('showNavCtrl', function ($scope) {
    $scope.data.visiable = true;
  })



