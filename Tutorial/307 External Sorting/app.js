var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', '$interval', 'uiGridConstants', function ($scope, $http, $interval, uiGridConstants) {

  $scope.sortChanged = function ( grid, sortColumns ) {
    if( sortColumns.length === 0 || sortColumns[0].name !== $scope.gridOptions.columnDefs[0].name ){
      $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
      .success(function(data) {
        $scope.gridOptions.data = data;
      });
    } else {
      switch( sortColumns[0].sort.direction ) {
        case uiGridConstants.ASC:
          $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json')
          .success(function(data) {
            $scope.gridOptions.data = data;
          });
          break;
        case uiGridConstants.DESC:
          $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json')
          .success(function(data) {
            $scope.gridOptions.data = data;
          });
          break;
        case undefined:
          $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
          .success(function(data) {
            $scope.gridOptions.data = data;
          });
          break;
      }
    }
  };

  $scope.gridOptions = {
    useExternalSorting: true,
    columnDefs: [
      { name: 'name' },
      { name: 'gender' },
      { name: 'company', enableSorting: false}
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      $scope.gridApi.core.on.sortChanged( $scope, $scope.sortChanged );
      $scope.sortChanged($scope.gridApi.grid, [ $scope.gridOptions.columnDefs[1] ] );
    }
  };

}]);
