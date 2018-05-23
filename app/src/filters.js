angular.module('app.filters', [])
  .filter('trustHtml', function ($sce) {          //传入的字符串以html的形式进行解析并返回
    return function (input) {
      return $sce.trustAsHtml(input);
    }
  })
  .filter('clearHtml', function () {
    return function (input) {
      return input.replace(/<.*?>|&#12288;/g, '');
    }
  })
