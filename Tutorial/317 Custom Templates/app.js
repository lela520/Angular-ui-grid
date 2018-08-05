var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', '$timeout', '$interval', function ($scope, $http, $timeout, $interval) {
  var start = new Date();
  var sec = $interval(function () {
    var wait = parseInt(((new Date()) - start) / 1000, 10);
    $scope.wait = wait + 's';
  }, 1000);

  // you could of course just include the template inline in your code, this example shows a template being returned from a function
  function rowTemplate() {
    return $timeout(function() {
      $scope.waiting = 'Done!';
      $interval.cancel(sec);
      $scope.wait = '';
      return '<div ng-class="{ \'my-css-class\': grid.appScope.rowFormatter( row ) }">' +
                 '  <div ng-if="row.entity.merge">{{row.entity.title}}</div>' +
                 '  <div ng-if="!row.entity.merge" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                 '</div>';
    }, 6000);
  }

  // Access outside scope functions from row template
  $scope.rowFormatter = function( row ) {
    return row.entity.gender === 'male';
  };

  $scope.waiting = 'Waiting for row template...';

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function (data) {
      data.forEach( function(row, index) {
        row.widgets = index % 10;
      });
      data[1].merge = true;
      data[1].title = "A merged row";
      data[4].merge = true;
      data[4].title = "Another merged row";
      $scope.data = data;
    });

  $scope.gridOptions = {
    enableFiltering: true,
    rowTemplate: rowTemplate(),
    data: 'data',
    columnDefs: [
      { name: 'name' },
      { name: 'gender' },
      { name: 'company' },
      { name: 'widgets' },
      { name: 'cumulativeWidgets', field: 'widgets', cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{grid.appScope.cumulative(grid, row)}}</div>' }
    ]
  };

  $scope.cumulative = function( grid, myRow ) {
    var myRowFound = false;
    var cumulativeTotal = 0;
    grid.renderContainers.body.visibleRowCache.forEach( function( row, index ) {
      if( !myRowFound ) {
        cumulativeTotal += row.entity.widgets;
        if( row === myRow ) {
          myRowFound = true;
        }
      }
    });
    return cumulativeTotal;
  };
}]);
