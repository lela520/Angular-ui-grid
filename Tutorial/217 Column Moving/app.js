var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.moveColumns']);
app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.gridOptions = {
  };

  $scope.gridOptions.columnDefs = [
    { name: 'id'},
    { name: 'name'},
    { name: 'age'},
    { name: 'gender'},
    { name: 'email'},
  ];

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
