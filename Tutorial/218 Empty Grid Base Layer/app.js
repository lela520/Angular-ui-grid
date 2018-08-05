var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.resizeColumns',
    'ui.grid.moveColumns', 'ui.grid.emptyBaseLayer', 'ui.grid.autoResize', 'ui.grid.pinning']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.gridOptions = {
    enableSorting: true,
    columnDefs: [
      { field: 'name', minWidth: 100, width: 150, enableColumnResizing: false, pinnedLeft:true},
      { field: 'gender', width: '40%', maxWidth: 200, minWidth: 70 },
      { field: 'company', width: '30%' }
    ]
  };

  $scope.randomSize = function () {
    var newHeight = Math.floor(Math.random() * (300 - 100 + 1) + 300),
      newWidth = Math.floor(Math.random() * (600 - 200 + 1) + 200);

    angular.element(document.getElementsByClassName('grid')[0]).css('height', newHeight + 'px');
    angular.element(document.getElementsByClassName('grid')[0]).css('width', newWidth + 'px');
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/5.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
