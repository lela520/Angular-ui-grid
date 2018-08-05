var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  $scope.gridOptions = {
    enableSorting: true,
    columnDefs: [
      { field: 'name', cellTooltip: 'Custom string', headerTooltip: 'Custom header string' },
      { field: 'company', cellTooltip: 
        function( row, col ) {
          return 'Name: ' + row.entity.name + ' Company: ' + row.entity.company;
        }, headerTooltip: 
        function( col ) {
          return 'Header: ' + col.displayName;
        }
      },
      { field: 'gender', cellTooltip: true, headerTooltip: true, cellFilter: 'mapGender' },
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
      data.forEach( function setGender( row, index ){
        row.gender = row.gender==='male' ? '1' : '2';
      });

      $scope.gridOptions.data = data;
    });
}])
.filter('mapGender', function() {
  var genderHash = {
    1: 'male',
    2: 'female'
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return genderHash[input];
    }
  };
});
