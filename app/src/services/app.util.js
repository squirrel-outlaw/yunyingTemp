'use strict';

angular.module('app.services.util', [])
  .constant('localDataUrl', '../temp_data/data.json')
  .constant('databaseUrl', 'http://localhost:8888')

  .factory('dlsAPI', function (localDataUrl) {
    var dlsAPI = {};
    dlsAPI.packApi = function (api) {
      return localDataUrl + api;
    }
    return dlsAPI;
  })

  .factory('databaseAPI', function (databaseUrl) {
    var databaseAPI = {};
    databaseAPI.packApi = function (api) {
      return databaseUrl + api;
    }
    return databaseAPI;
  })
