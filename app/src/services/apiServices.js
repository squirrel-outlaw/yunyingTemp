/**
 * Created by oxygen on 2017/4/21.
 */
angular.module('myApp.apiServices', [
  "ngResource"
])

  .factory('aliYunImageUrl', function (databaseAPI) {
    var api = databaseAPI.packApi('/images/upload');
    return api
  })

  .service('articalResource', function (databaseAPI, $resource) {
    var api = databaseAPI.packApi('/articals/:id');
    return $resource(api, {id: '@id'})
  })

  .service('imageResource', function (databaseAPI, $resource) {
    var api = databaseAPI.packApi('/images/:id');
    return $resource(api, {id: '@id'})
  })

  .service('aliSmsResource', function (databaseAPI, $resource) {
    var api = databaseAPI.packApi('/sendSms');
    return $resource(api)
  });








