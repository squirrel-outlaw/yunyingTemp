'use strict';

angular.module('app.services.util',[] )

  .constant('aliYunUrl', 'http://39.106.161.227:8080')
  //.constant('aliYunDatabaseUrl', 'http://39.106.161.227:8080/yunyingdatabase')
  .constant('aliYunDatabaseUrl', 'http://localhost:8888/')

  .factory('aliYunAPI', function (aliYunUrl) {
    var aliYunAPI = {};
    aliYunAPI.packApi = function (api) {
      return aliYunUrl + api;
    }
    return aliYunAPI;
  })

  .factory('databaseAPI', function (aliYunDatabaseUrl) {
    var databaseAPI = {};
    databaseAPI.packApi = function (api) {
      return aliYunDatabaseUrl + api;
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
