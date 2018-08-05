var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', 'i18nService', '$http', function ($scope, i18nService, $http) {
  $scope.langs = i18nService.getAllLangs();
  $scope.lang = 'zh-cn';

  $scope.gridOptions = {
    columnDefs: [
      { field: 'name' },
      { field: 'gender' },
      { field: 'company', enableFiltering: false  }
    ]
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
  .success(function(data) {
    $scope.gridOptions.data = data;
  });
}]);
