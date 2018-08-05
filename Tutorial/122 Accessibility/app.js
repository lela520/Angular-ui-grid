var app = angular.module('app', ['ngTouch', 'ngAria', 'ui.grid', 'ui.grid.pagination', 'ui.grid.cellNav']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  var setGender = function ( row, index ){
    row.gender = row.gender==='male' ? '1' : '2';
  };
  $scope.smallGrid = {
    enableSorting: true,
    showGridFooter: true,
    enableGridMenu: true,
    enableFiltering: true,
    columnDefs: [
      { field: 'firstName'},
      {
        field: 'lastName',
        filter: {
          placeholder: 'set sr focus here',
          ariaLabel: 'I have a custom aria label for this field.'
        }
      },
      {
        field: 'gender',
        filter: {
          type: uiGridConstants.filter.SELECT,
          selectOptions: [
            {value: '1', label: 'male'},
            {value: '2', label: 'female'},
          ],
        },
        cellFilter: 'mapGender'
      },
      { field: 'company' },
      { field: 'employed'},
    ],
    data: [
      {
          "firstName": "Cox",
          "lastName": "Carney",
          "gender": 1,
          "company": "Enormo",
          "employed": true
      },
      {
          "firstName": "Lorraine",
          "lastName": "Wise",
          "gender": 2,
          "company": "Comveyer",
          "employed": false
      },
      {
          "firstName": "Nancy",
          "lastName": "Waters",
          "gender": 2,
          "company": "Fuelton",
          "employed": false
      }
    ],
  };


  $scope.virtualGridOptions = {
    enableSorting: true,
    showGridFooter: true,
    enableFiltering: true,
    modifierKeysToMultiSelectCells: true,
    columnDefs: [
      { field: 'name'},
      { field: 'company'},
      { field: 'gender', cellTooltip: true, headerTooltip: true, cellFilter: 'mapGender' },
    ],
    onRegisterApi: function( gridApi ) {
      $scope.gridApi = gridApi;
      $scope.gridApi.core.on.sortChanged( $scope, function( grid, sort ) {
        $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
      })
    }
  };
  $scope.paginationGridOptions = {
    paginationPageSizes: [10, 25, 50, 75],
    paginationPageSize: 10,
  };
  angular.extend($scope.paginationGridOptions, $scope.virtualGridOptions);

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      data.forEach(setGender);
      $scope.virtualGridOptions.data = data;
      $scope.paginationGridOptions.data = data;
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
});
