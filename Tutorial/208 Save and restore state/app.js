var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.saveState', 'ui.grid.selection', 'ui.grid.cellNav', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.grid.grouping' ]);

app.controller('MainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
  $scope.gridOptions = {
    saveFocus: false,
    saveScroll: true,
    saveGroupingExpandedStates: true,
    enableFiltering: true,
    columnDefs: [
      { name: 'name' },
      { name: 'gender' },
      { name: 'company' }
    ],
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };
  $scope.state = {};

  $scope.saveState = function() {
    $scope.state = $scope.gridApi.saveState.save();
  };

  $scope.restoreState = function() {
    $scope.gridApi.saveState.restore( $scope, $scope.state );
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
