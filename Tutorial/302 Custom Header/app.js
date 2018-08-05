var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.gridOptions = {
    headerTemplate: 'header-template.html',
    data: [
      { name: 'Bob', title: 'CEO' },
      { name: 'Frank', title: 'Lowly Developer' }
    ]
  };

  $scope.gridOptions2 = {
    data: [
      { name: 'Bob', title: 'CEO' },
      { name: 'Frank', title: 'Lowly Developer' }
    ]
  };
}]);
