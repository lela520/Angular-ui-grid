var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  $scope.columns = [{ field: 'name' }, { field: 'gender' }];
  $scope.gridOptions = {
    enableSorting: true,
    columnDefs: $scope.columns,
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
    }
  };
  
  $scope.remove = function() {
    $scope.columns.splice($scope.columns.length-1, 1);
  }
  
  $scope.add = function() {
    $scope.columns.push({ field: 'company', enableSorting: false });
  }

  $scope.splice = function() {
    $scope.columns.splice(1, 0, { field: 'company', enableSorting: false });
  }

  $scope.unsplice = function() {
    $scope.columns.splice(1, 1);
  }
  
  $scope.toggleDisplayName = function() {
    if( $scope.columns[1].displayName === 'GENDER' ){
      $scope.columns[1].displayName = 'Gender';
    } else {
      $scope.columns[1].displayName = 'GENDER';
    }
    $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
  }
  
  $scope.toggleVisible = function() {
    $scope.columns[0].visible = !($scope.columns[0].visible || $scope.columns[0].visible === undefined);
    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
  }

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
