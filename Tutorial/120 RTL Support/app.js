var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.pinning']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.gridOptions = {
    columnDefs: [
      { name: 'field1', field: 'name', width: 200 },
      { name: 'field2', field: 'gender', width: 200 },
      { name: 'field3', field: 'company', width: 200 },
      { name: 'field4', field: 'name', width: 200 },
      { name: 'field5', field: 'gender', width: 200 },
      { name: 'field6', field: 'company', width: 200 },
      { name: 'field7', field: 'name', width: 200 },
      { name: 'field8', field: 'gender', width: 200 },
      { name: 'field9', field: 'company', width: 200 },
      { name: 'field10', field: 'name', width: 200 },
      { name: 'field11', field: 'gender', width: 200 },
      { name: 'field12', field: 'company', width: 200 },
      { name: 'field13', field: 'name', width: 200 },
      { name: 'field14', field: 'gender', width: 200 },
      { name: 'field15', field: 'company', width: 200 }
    ]
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
