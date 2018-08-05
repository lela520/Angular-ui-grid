var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.validate', 'addressFormatter']);

angular.module('addressFormatter', []).filter('address', function () {
  return function (input) {
      return input.street + ', ' + input.city + ', ' + input.state + ', ' + input.zip;
  };
});

app.controller('MainCtrl', ['$scope', '$http', '$window', 'uiGridValidateService', function ($scope, $http, $window, uiGridValidateService) {

  uiGridValidateService.setValidator('startWith',
    function(argument) {
      return function(oldValue, newValue, rowEntity, colDef) {
        if (!newValue) {
          return true; // We should not test for existence here
        } else {
          return newValue.startsWith(argument);
        }
      };
    },
    function(argument) {
      return 'You can only insert names starting with: "' + argument + '"';
    }
  );

  $scope.gridOptions = { enableCellEditOnFocus: true };

  $scope.gridOptions.columnDefs = [
    { name: 'id', enableCellEdit: false, width: '10%' },
    { name: 'name', displayName: 'Name (editable)', width: '20%',
      validators: {required: true, startWith: 'M'}, cellTemplate: 'ui-grid/cellTitleValidator' }
  ];



 $scope.msg = {};

 $scope.gridOptions.onRegisterApi = function(gridApi){
          //set gridApi on scope
          $scope.gridApi = gridApi;
          gridApi.validate.on.validationFailed($scope,function(rowEntity, colDef, newValue, oldValue){
            $window.alert('rowEntity: '+ rowEntity + '\n' +
                          'colDef: ' + colDef + '\n' +
                          'newValue: ' + newValue + '\n' +
                          'oldValue: ' + oldValue);
          });
        };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
;
