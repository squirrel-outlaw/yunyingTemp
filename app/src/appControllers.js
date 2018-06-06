'use strict';

angular.module('myApp.appControllers', [
  'myApp.apiServices',
  'ngFileUpload',
  'app.services.util',
  'ui.bootstrap'
])
  .controller('myCtrl', function ($scope) {
    $scope.data = {
      visiable: true
    };
  })


  .controller('addArticalsCtrl', function ($scope, articalResource, uploadImage,$uibModal) {
    $scope.uploadImage = function (picFile) {
      uploadImage.upload(picFile).then(function (response) {    //使用then来获取异步响应后从服务器中返回的数据
        $scope.artical.topicalimageUrl = response.data.url
      });
    };
    $scope.addArtical = function (artical) {
      new $scope.articalsResource(artical).$save().then(function (newArtical) {
        $scope.articals.push(newArtical);
      })
    };
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

    $scope.open = function (size) {
      $scope.addArtical($scope.artical);
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'editArticalResultModal.html',
        controller: 'editArticalResultModalInstanceCtrl',
        controllerAs: 'mic',
        backdrop: "static",
        size: size,
        resolve: {
          items1: function () {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then(function () {
      }, function () {
      });
    };
    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

  })

  .controller('homepageCtrl', function ($scope, articalResource) {
    $scope.data.visiable = true;
    $scope.artical = {};
    $scope.articals = [];
    $scope.articalsResource = articalResource;
    $scope.listAllArticals = function () {
      $scope.articals = $scope.articalsResource.query();
    };
    $scope.listAllArticals();
  })

  .controller('listArticalsCtrl', function ($scope, $log, articalResource, Upload, $timeout) {
    $scope.artical = {};
    $scope.articals = [];
    $scope.articalsResource = articalResource;
    //REST风格的.query会对远程接口生成如/articals，Request Method:GET的请求,并且返回的数组对象
    $scope.listAllArticals = function () {
      $scope.articals = $scope.articalsResource.query();
    };
    $scope.addArtical = function (artical) {
      new $scope.articalsResource(artical).$save().then(function (newArtical) {
        $scope.articals.push(newArtical);
      });
    };
    $scope.deleteArtical = function (artical) {
      //跨域请求生成Request Method:OPTIONS，Request Method:DELETE两条请求，删除本地文章必须放在前面才能实时在本地页面响应
      $scope.articals.splice($scope.articals.indexOf(artical), 1);
      artical.$delete().then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
      });
    };
    $scope.listAllArticals();
  })

  .controller('getArticalByIdCtrl', function ($scope,$stateParams, articalResource) {
    $scope.data.visiable = false;

    $scope.artical = {};
    $scope.articalsResource = articalResource;
    $scope.getArtical = function (id) {
      $scope.artical = $scope.articalsResource.get({id:id});
    };
    $scope.getArtical($stateParams.articalId)
  })






  .controller('listImagesCtrl', function ($scope, $log, imageResource, Upload, $timeout) {
    $scope.image = {};
    $scope.images = [];

    $scope.imagessResource = imageResource;
    //REST风格的.query会对远程接口生成如/images，Request Method:GET的请求
    $scope.listAllimages = function () {
      $scope.images = $scope.imagessResource.query();
    };
    $scope.addImage = function (image) {
      new $scope.imagessResource(image).$save().then(function (newImage) {
        $scope.images.push(newImage);
      });
    };
    $scope.deleteImage = function (image) {
      //跨域请求生成Request Method:OPTIONS，Request Method:DELETE两条请求，删除本地文章必须放在前面才能实时在本地页面响应
      $scope.images.splice($scope.images.indexOf(image), 1);
      $scope.imagessResource.delete({id: image.id}, function (response) {
        console.log(response)
      })
    };
    $scope.listAllimages();

  })

  .controller('hideNavCtrl', function ($scope) {
    $scope.data.visiable = false;
  })
  .controller('showNavCtrl', function ($scope) {
    $scope.data.visiable = true;
  })



  //$uibModalInstance是模态窗口的实例
  .controller('editArticalResultModalInstanceCtrl', function ($uibModalInstance, items1) {
    this.ok = function () {
      $uibModalInstance.close();
    };
    this.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })

  .controller('registerModalCtrl', function ($scope, $uibModal, $log) {
    $scope.open = function (size) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'registerModal.html',
        controller: 'registerModalInstanceCtrl',
        controllerAs: 'mic',
        backdrop: "static",
        size: size,
        resolve: {
          items1: function () {
            return $scope.items;
          }
        }
      });
      modalInstance.result.then(function () {
      }, function () {
      });
    };
    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
  })

  //$uibModalInstance是模态窗口的实例
  .controller('registerModalInstanceCtrl', function ($uibModalInstance, items1) {
    this.ok = function () {
      $uibModalInstance.close();
    };
    this.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
