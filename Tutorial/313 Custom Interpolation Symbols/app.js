var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

app.controller('MainCtrl', ['$scope', '$http', '$interpolate', function ($scope, $http, $interpolate) {
  $scope.foo = 'whoohoo!';
  $scope.startSym = $interpolate.startSymbol();
  $scope.endSym = $interpolate.endSymbol();

  $scope.gridOptions = {
    enableSorting: true,
    columnDefs: [
      { field: 'name' },
      { field: 'gender' },
      { field: 'company', enableSorting: false }
    ]
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
