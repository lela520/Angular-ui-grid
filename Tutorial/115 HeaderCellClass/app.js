var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  $scope.gridOptions = {
    enableSorting: true,
    columnDefs: [
      { field: 'name', headerCellClass: 'blue' },
      { field: 'company',
        headerCellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
          if (col.sort.direction === uiGridConstants.ASC) {
            return 'red';
          }
        }
      }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      $scope.gridApi.core.on.sortChanged( $scope, function( grid, sort ) {
        $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
      })
    }
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
