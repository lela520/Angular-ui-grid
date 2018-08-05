var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav', 'addressFormatter']);

angular.module('addressFormatter', []).filter('address', function () {
  return function (input) {
      return input.street + ', ' + input.city + ', ' + input.state + ', ' + input.zip;
  };
});

app.controller('MainCtrl', ['$scope', '$http', '$q', '$interval', function ($scope, $http, $q, $interval) {
  $scope.gridOptions = {};

  $scope.gridOptions.columnDefs = [
    { name: 'id', enableCellEdit: false },
    { name: 'name', displayName: 'Name (editable)' },
    { name: 'gender' },
    { name: 'age', displayName: 'Age' , type: 'number'},
    { name: 'registered', displayName: 'Registered' , type: 'date', cellFilter: 'date:"yyyy-MM-dd"'},
    { name: 'address', displayName: 'Address', type: 'object', cellFilter: 'address'},
    { name: 'address.city', displayName: 'Address (even rows editable)',
         cellEditableCondition: function($scope){
         return $scope.rowRenderIndex%2
         }
    },
    { name: 'isActive', displayName: 'Active', type: 'boolean'}
  ];

  $scope.saveRow = function( rowEntity ) {
    // create a fake promise - normally you'd use the promise returned by $http or $resource
    var promise = $q.defer();
    $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );

    // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
    $interval( function() {
      if (rowEntity.gender === 'male' ){
        promise.reject();
      } else {
        promise.resolve();
      }
    }, 3000, 1);
  };

  $scope.gridOptions.onRegisterApi = function(gridApi){
    //set gridApi on scope
    $scope.gridApi = gridApi;
    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
  .success(function(data) {
    for(i = 0; i < data.length; i++){
      data[i].registered = new Date(data[i].registered);
    }
    $scope.gridOptions.data = data;
  });
}]);
