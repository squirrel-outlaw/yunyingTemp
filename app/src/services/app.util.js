'use strict';

angular.module('app.services.util', [])
  .constant('localDataUrl', '../temp_data/data.json')
  .constant('localDatabaseUrl', 'http://localhost:8888')

  .factory('dlsAPI', function (localDataUrl) {
    var dlsAPI = {};
    dlsAPI.packApi = function (api) {
      return localDataUrl + api;
    }
    return dlsAPI;
  })
  .factory('remoteAPI', function (localDatabaseUrl) {
    var remoteAPI = {};
    remoteAPI.packApi = function (api) {
      return localDatabaseUrl + api;
    }
    return remoteAPI;
  })
