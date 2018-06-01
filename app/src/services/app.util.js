'use strict';


angular.module('app.services.util',[] )
// .constant('localDataUrl', '../temp_data/data.json')
  .constant('aliYunUrl', 'http://localhost:8888')

  .factory('databaseAPI', function (aliYunUrl) {
    var databaseAPI = {};
    databaseAPI.packApi = function (api) {
      return aliYunUrl + api;
    }
    return databaseAPI;
  })

  .factory('uploadImage', function (Upload, aliYunImageUrl,$q) {
    return {
      upload: function (picFile) {
        var deferred = $q.defer();  //设定promise
        Upload.upload({
          url: aliYunImageUrl,
          data: {
            file: picFile
          },
        }).then(function (response) {
            deferred.resolve(response);  //响应后成功后处理
          }
        , function (response) {
        }, function (evt) {
        });
        return deferred.promise;  //返回promise对象
      }
    }
  })
