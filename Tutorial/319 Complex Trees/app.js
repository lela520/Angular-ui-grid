var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.treeView' ]);

app.controller('MainCtrl', ['$scope', '$http', '$interval', 'uiGridTreeViewConstants', function ($scope, $http, $interval, uiGridTreeViewConstants ) {
  $scope.gridOptions = {
    enableSorting: true,
    enableFiltering: true,
    columnDefs: [
      { name: 'name', width: '30%' },
      { name: 'gender', width: '20%' },
      { name: 'age', width: '20%' },
      { name: 'company', width: '25%' },
      { name: 'state', width: '35%', field: 'address.state' },
      { name: 'balance', width: '25%', treeAggregationType: uiGridTreeViewConstants.aggregation.SUM, cellFilter: 'currency', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><span>{{row.entity.balance CUSTOM_FILTERS}}</span><span ng-if="row.entity[\'$$\' + col.uid]"> ({{row.entity["$$" + col.uid].value CUSTOM_FILTERS}})</span></div>' }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      $scope.gridApi.treeBase.on.rowExpanded($scope, function(row) {
        if( row.entity.$$hashKey === $scope.gridOptions.data[50].$$hashKey && !$scope.nodeLoaded ) {
          $interval(function() {
            $scope.gridOptions.data.splice(51,0,
              {name: 'Dynamic 1', gender: 'female', age: 53, company: 'Griddable grids', balance: 38000, $$treeLevel: 1},
              {name: 'Dynamic 2', gender: 'male', age: 18, company: 'Griddable grids', balance: 29000, $$treeLevel: 1}
            );
            $scope.nodeLoaded = true;
          }, 2000, 1);
        }
      });
    }
  };

 $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
 .success(function(data) {
   for ( var i = 0; i < data.length; i++ ){
     data[i].balance = Number( data[i].balance.slice(1).replace(/,/,'') );
   }
   data[0].$$treeLevel = 0;
   data[1].$$treeLevel = 1;
   data[10].$$treeLevel = 1;
   data[20].$$treeLevel = 0;
   data[25].$$treeLevel = 1;
   data[35].$$treeLevel = 2;
   data[40].$$treeLevel = 3;
   data[45].$$treeLevel = 4;
   data[50].$$treeLevel = 0;
   data[51].$$treeLevel = 0;
   $scope.gridOptions.data = data;
 });

  $scope.expandAll = function(){
    $scope.gridApi.treeBase.expandAllRows();
  };

  $scope.toggleRow = function( rowNum ){
    $scope.gridApi.treeBase.toggleRowTreeState($scope.gridApi.grid.renderContainers.body.visibleRowCache[rowNum]);
  };
}]);
