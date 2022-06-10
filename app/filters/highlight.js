angular.module('appModule').filter('highlight', function ($sce) {
  return function (text, filter) {
    var regex = new RegExp('(' + filter + ')', 'i');
    return $sce.trustAsHtml(text.replace(regex, '<mark>$&</mark>'));
  };
});
