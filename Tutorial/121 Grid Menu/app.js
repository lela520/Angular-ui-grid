var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.exporter', 'ui.grid.selection']);

app.controller('MainCtrl', ['$scope', '$http', '$interval', '$q', function ($scope, $http, $interval, $q) {
  var fakeI18n = function( title ){
    var deferred = $q.defer();
    $interval( function() {
      deferred.resolve( 'Chinese: ' + title );
    }, 2000, 1);
    return deferred.promise;
  };

  $scope.gridOptions = {
    exporterMenuCsv: false,
    enableGridMenu: true,
    gridMenuShowHideColumns: true,
    gridMenuTitleFilter: fakeI18n,
    columnDefs: [
      { name: 'name' },
      { name: 'gender', enableHiding: false },
      { name: 'company' }
    ],
    gridMenuCustomItems: [
      {
        title: 'Rotate Grid',
        action: function ($event) {
          this.grid.element.toggleClass('rotated');
        },
        order: 210
      }
    ],
    onRegisterApi: function( gridApi ){
      $scope.gridApi = gridApi;

      // interval of zero just to allow the directive to have initialized
      $interval( function() {
        gridApi.core.addToGridMenu( gridApi.grid, [{ title: 'Dynamic item', order: 100}]);
      }, 0, 1);

      gridApi.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
        $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
      });
    }
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
