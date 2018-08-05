var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.gridOptions1 = {};
  $scope.gridOptions2 = {};

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
  .success(function(data) {
    $scope.gridOptions1.data = data;
  });

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500.json')
  .success(function(data) {
    $scope.gridOptions2.data = data;
  });
}]);
