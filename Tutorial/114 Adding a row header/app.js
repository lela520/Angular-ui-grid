var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.columns = [{ field: 'name' }, { field: 'gender' }];
  $scope.gridOptions = {
    enableSorting: true,
    enableGridMenu: true,
    enableColumnMenus: true,
    columnDefs: $scope.columns,
    onRegisterApi: function( gridApi ) { 
      $scope.gridApi = gridApi;
      var cellTemplate = 'ui-grid/selectionRowHeader';   // you could use your own template here
      $scope.gridApi.core.addRowHeaderColumn( { name: 'rowHeaderCol', displayName: '', width: 30, cellTemplate: cellTemplate} );
    }
  };
  
  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      console.log(data)
    });
}]);
