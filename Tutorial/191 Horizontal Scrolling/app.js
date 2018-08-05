var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', function ($scope) {
  var colCount = 500;
  var rowCount = 500;
  var gridOptions = {};

  function generateColumns() {
    for (var colIndex = 0; colIndex < colCount; colIndex++) {
      gridOptions.columnDefs.push({
        name: 'col' + colIndex,
        width: Math.floor(Math.random() * (120 - 50 + 1)) + 50
      });
    }
  }

  function generateData() {
    for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      var row = {};

      for (var colIndex = 0; colIndex < colCount; colIndex++) {
        row['col' + colIndex] = 'r' + rowIndex + 'c' + colIndex;
      }

      gridOptions.data.push(row);
    }
  }

  function initialize() {
    gridOptions = {
      enableSorting: true,
      fastWatch: true,
      columnDefs: [],
      data: []
    };
    generateColumns();
    generateData();

    $scope.gridOptions = gridOptions;
  }

  initialize();
}]);
