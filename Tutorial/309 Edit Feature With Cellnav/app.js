var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'addressFormatter']);

angular.module('addressFormatter', []).filter('address', function () {
  return function (input) {
      return input.street + ', ' + input.city + ', ' + input.state + ', ' + input.zip;
  };
});

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.gridOptions = { enableCellEditOnFocus: true };

  $scope.gridOptions.columnDefs = [
    { name: 'id', enableCellEdit: false, width: '10%' },
    { name: 'name', displayName: 'Name (editable)', width: '20%' },
    { name: 'age', displayName: 'Age' , type: 'number', width: '10%' },
    { name: 'gender', displayName: 'Gender', editableCellTemplate: 'ui-grid/dropdownEditor', width: '20%', 
      cellFilter: 'mapGender', editDropdownValueLabel: 'gender', editDropdownOptionsArray: [
      { id: 1, gender: 'male' }, 
      { id: 2, gender: 'female' } 
    ] }, 
    { name: 'registered', displayName: 'Registered' , type: 'date', cellFilter: 'date:"yyyy-MM-dd"', width: '20%' },
    { name: 'address', displayName: 'Address', type: 'object', cellFilter: 'address', width: '30%' },
    { name: 'address.city', displayName: 'Address (even rows editable)', width: '20%',
         cellEditableCondition: function($scope){
         return $scope.rowRenderIndex%2
         }
    },
    { name: 'isActive', displayName: 'Active', type: 'boolean', width: '10%' }
  ];



 $scope.msg = {};

 $scope.gridOptions.onRegisterApi = function(gridApi){
          //set gridApi on scope
          $scope.gridApi = gridApi;
          gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            $scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
            $scope.$apply();
          });
        };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      for(i = 0; i < data.length; i++){
        data[i].registered = new Date(data[i].registered);
        data[i].gender = data[i].gender==='male' ? 1 : 2;
      }
      $scope.gridOptions.data = data;
    });
}])

.filter('mapGender', function() {
  var genderHash = {
    1: 'male',
    2: 'female'
  };
  
  return function(input) {
    if (!input){
      return '';
    } else {
      return genderHash[input];
    }
  };
})
;
