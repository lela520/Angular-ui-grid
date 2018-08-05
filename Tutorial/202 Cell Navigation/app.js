var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.pinning']);

app.controller('MainCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {
  $scope.gridOptions = {
    modifierKeysToMultiSelectCells: true,
    keyDownOverrides: [ { keyCode: 39, ctrlKey: true }],
    showGridFooter: true
  };
  $scope.gridOptions.columnDefs = [
    { name: 'id', width:'150' },
    { name: 'name', width:'200' },
    { name: 'age', displayName: 'Age (not focusable)', allowCellFocus : false, width:'100' },
    { name: 'address.city', width:'200' },
    { name: 'phone', width:'150' },
    { name: 'company', width:'150' },
    { name: 'email', width:'150' },
    { name: 'balance', width:'100' },
    { name: 'guid', width:'100' }
  ];

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });

    $scope.info = {};

    $scope.currentFocused = "";

    $scope.getCurrentFocus = function(){
      var rowCol = $scope.gridApi.cellNav.getFocusedCell();
      if(rowCol !== null) {
          $scope.currentFocused = 'Row Id:' + rowCol.row.entity.id + ' col:' + rowCol.col.colDef.name;
      }
    };

    $scope.getCurrentSelection = function() {
      var values = [];
      var currentSelection = $scope.gridApi.cellNav.getCurrentSelection();
      for (var i = 0; i < currentSelection.length; i++) {
        values.push(currentSelection[i].row.entity[currentSelection[i].col.name])
      }
      $scope.printSelection = values.toString();
    };

    $scope.scrollTo = function( rowIndex, colIndex ) {
      $scope.gridApi.core.scrollTo( $scope.gridOptions.data[rowIndex], $scope.gridOptions.columnDefs[colIndex]);
    };

    $scope.scrollToFocus = function( rowIndex, colIndex ) {
      $scope.gridApi.cellNav.scrollToFocus( $scope.gridOptions.data[rowIndex], $scope.gridOptions.columnDefs[colIndex]);
    };

    $scope.gridOptions.onRegisterApi = function(gridApi){
       $scope.gridApi = gridApi;
       gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
             // var rowCol = {row: newRowCol.row.index, col:newRowCol.col.colDef.name};
             // var msg = 'New RowCol is ' + angular.toJson(rowCol);
             // if(oldRowCol){
             //    rowCol = {row: oldRowCol.row.index, col:oldRowCol.col.colDef.name};
             //    msg += ' Old RowCol is ' + angular.toJson(rowCol);
             // }
              $log.log('navigation event');
            });
        gridApi.cellNav.on.viewPortKeyDown($scope,function(event, newRowCol){
                var row = newRowCol.row;
                var col = newRowCol.col
                if (event.keyCode === 39) {
                    $scope.gridApi.cellNav.scrollToFocus(row.entity, $scope.gridApi.grid.columns[$scope.gridApi.grid.columns.length - 1]);
                }
            });
    };
}]);
