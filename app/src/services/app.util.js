'use strict';

angular.module('app.services.util', [])
 // .constant('localDataUrl', '../temp_data/data.json')
  .constant('aliYunUrl', 'http://localhost:8888')

  .factory('databaseAPI', function (aliYunUrl) {
    var databaseAPI = {};
    databaseAPI.packApi = function (api) {
      return aliYunUrl + api;
    }
    return databaseAPI;
  })
