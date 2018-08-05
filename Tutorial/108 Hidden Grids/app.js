var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.hideGrid = true;

  $scope.gridOptions = {  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
