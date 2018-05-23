/**
 * Created by oxygen on 2017/4/21.
 */
angular.module('myApp.apiServices', [
  "ngResource"
])
  .service('fetchArticals', function (dlsAPI, $resource) {
    var api = dlsAPI.packApi("");
    return $resource(api, {}, {myGet: {method: 'get', isArray: true}})  //isArray表明从data.json引入的是数组不是对象
 })
  .service('articalResource', function (remoteAPI, $resource) {
    this.getArticalResource=function (mapping) {
      var api = remoteAPI.packApi(mapping);
      return $resource(api)
    }
  })








