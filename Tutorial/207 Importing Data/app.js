var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.importer']);

app.controller('MainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
  $scope.data = [];
  $scope.gridOptions = {
    enableGridMenu: true,
    data: 'data',
    importerDataAddCallback: function ( grid, newObjects ) {
      $scope.data = $scope.data.concat( newObjects );
    },
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };
}]);
