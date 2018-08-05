var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.moveColumns']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.gridOptions = {
    enableSorting: true,
    columnDefs: [
      { field: 'name', minWidth: 200, width: '50%', enableColumnResizing: false },
      { field: 'gender', width: '30%', maxWidth: 200, minWidth: 70 },
      { field: 'company', width: '20%' }
    ]
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
