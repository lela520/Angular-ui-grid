var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', '$interval', 'uiGridConstants', function ($scope, $http, $interval, uiGridConstants) {

  $scope.gridOptions = {
    enableFiltering: true,
    useExternalFiltering: true,
    columnDefs: [
      { name: 'name', enableFiltering: false },
      { name: 'gender' },
      { name: 'company', enableFiltering: false}
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
        $scope.gridApi.core.on.filterChanged( $scope, function() {
          var grid = this.grid;
          if( grid.columns[1].filters[0].term === 'male' ) {
            $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_male.json')
            .success(function(data) {
              $scope.gridOptions.data = data;
            });
          } else if ( grid.columns[1].filters[0].term === 'female' ) {
            $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_female.json')
            .success(function(data) {
              $scope.gridOptions.data = data;
            });
          } else {
            $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
            .success(function(data) {
              $scope.gridOptions.data = data;
            });
          }
        });
    }
  };
  
  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
  .success(function(data) {
    $scope.gridOptions.data = data;
  });
  
}]);
