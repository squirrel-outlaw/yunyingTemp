'use strict';

var appServer = '';
var bucket = 'squirrel-image';
var region = 'oss-cn-shenzhen';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;


// Play without STS. NOT SAFE! Because access key id/secret are
// exposed in web page.
var client = new OSS({
  region: region,
  accessKeyId: '11',
  accessKeySecret: '11',
  bucket: bucket
});

var applyTokenDo = function (func) {
  return func(client);
};


//通过服务器验证临时账号权限（STS）
//var applyTokenDo = function (func) {
// var url = appServer;
// return urllib.request(url, {
//   method: 'GET'
// }).then(function (result) {
//   var creds = JSON.parse(result.data);
//   var client = new OSS({
//    region: region,
//    accessKeyId: creds.AccessKeyId,
//      accessKeySecret: creds.AccessKeySecret,
//    stsToken: creds.SecurityToken,
//    bucket: bucket
//   });
//   return func(client);
// });
//};


var listFiles = function (client) {
  return client.list({
    'max-keys': 100
  }).then(function (result) {
    var objects = result.objects.sort(function (a, b) {
      var ta = new Date(a.lastModified);
      var tb = new Date(b.lastModified);
      if (ta > tb) return -1;
      if (ta < tb) return 1;
      return 0;
    });

  });
};

