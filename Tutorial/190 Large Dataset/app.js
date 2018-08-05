var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {
  $scope.gridOptions = {
  };

  $scope.gridOptions.columnDefs = [
    {name:'id'},
    {name:'name'},
    {field:'age'}, // showing backwards compatibility with 2.x.  you can use field in place of name
    {name: 'address.city'},
    {name: 'age again', field:'age'}
  ];

  var canceler = $q.defer();
  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/10000_complex.json', {timeout: canceler.promise})
    .success(function(data) {
      $scope.gridOptions.data = data;
    });

  $scope.$on('$destroy', function(){
    canceler.resolve();  // Aborts the $http request if it isn't finished.
  });
}]);
