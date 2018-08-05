var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  $scope.gridOptions = {  
    enableFiltering: true,
    flatEntityAccess: true,
    showGridFooter: true,
    fastWatch: true
  };

   $scope.gridOptions.columnDefs = [
    {name:'id'},
    {name:'name'},
    {name:'gender'},
    {field:'age'}
  ];

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/10000_complex.json')
  .success(function(data) {
    for( var i=0; i<6; i++){
      data = data.concat(data);
    }
    $scope.gridOptions.data = data;
  });
  
  $scope.toggleFlat = function() {
    $scope.gridOptions.flatEntityAccess = !$scope.gridOptions.flatEntityAccess;
  }
}]);
