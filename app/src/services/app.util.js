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

  .factory('aliyunOSS', function () {

    var appServer = '';
    var bucket = 'squirrel-image';
    var region = 'oss-cn-shenzhen';

    //var urllib = OSS.urllib;
    //var Buffer = OSS. Buffer;
   // var OSS =  OSS.Wrapper;
   // var STS = OSS.STS;

// Play without STS. NOT SAFE! Because access key id/secret are
// exposed in web page.
    var client = new OSS({
      region: region,
      accessKeyId: '11',
      accessKeySecret: '11',
      bucket: bucket
    })
    return {
      list: function () {
        client.list({
          'max-keys': 100
        }).then(function (result) {
          return result.objects.sort(function (a, b) {
            var ta = new Date(a.lastModified);
            var tb = new Date(b.lastModified);
            if (ta > tb) return -1;
            if (ta < tb) return 1;
            return 0;
          })
        })
      }
    }
  })
