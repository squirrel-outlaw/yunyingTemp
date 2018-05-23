'use strict';

angular.module('app.services.util', [])
  .constant('localDataUrl', '../temp_data/data.json')
  .constant('localDatabaseUrl', 'http://localhost:8888/artical/get')

  .factory('dlsAPI', function (localDataUrl) {
    var dlsAPI = {};
    dlsAPI.packApi = function (api) {
      return localDataUrl + api;
    }
    return dlsAPI;
  })
