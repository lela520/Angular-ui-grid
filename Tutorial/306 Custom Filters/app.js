var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  var today = new Date();
  var nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  $scope.gridOptions = {
    enableFiltering: true,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
      { field: 'name' },
      { field: 'gender',
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>', 
        filter: { 
          term: 1,
          options: [ {id: 1, value: 'male'}, {id: 2, value: 'female'}]     // custom attribute that goes with custom directive above 
        }, 
        cellFilter: 'mapGender' },                               
      { field: 'company', enableFiltering: false },
      { field: 'email', enableFiltering: false },
      { field: 'phone', enableFiltering: false },
      { field: 'age',
        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-modal></div></div>'
      },
      { field: 'mixedDate', cellFilter: 'date', width: '15%', enableFiltering: false }
    ]
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
      $scope.gridOptions.data[0].age = -5;

      data.forEach( function addDates( row, index ){
        row.mixedDate = new Date();
        row.mixedDate.setDate(today.getDate() + ( index % 14 ) );
        row.gender = row.gender==='male' ? '1' : '2';
      });
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

.directive('myCustomDropdown', function() {
  return {
    template: '<select class="form-control" ng-model="colFilter.term" ng-options="option.id as option.value for option in colFilter.options"></select>'
  };
})

.controller('myCustomModalCtrl', function( $scope, $compile, $timeout ) {
  var $elm;
  
  $scope.showAgeModal = function() {
    $scope.listOfAges = [];
    
    $scope.col.grid.appScope.gridOptions.data.forEach( function ( row ) {
      if ( $scope.listOfAges.indexOf( row.age ) === -1 ) {
        $scope.listOfAges.push( row.age );
      }
    });
    $scope.listOfAges.sort();
    
    $scope.gridOptions = { 
      data: [],
      enableColumnMenus: false,
      onRegisterApi: function( gridApi) {
        $scope.gridApi = gridApi;
        
        if ( $scope.colFilter && $scope.colFilter.listTerm ){
          $timeout(function() {
            $scope.colFilter.listTerm.forEach( function( age ) {
              var entities = $scope.gridOptions.data.filter( function( row ) {
                return row.age === age;
              }); 
              
              if( entities.length > 0 ) {
                $scope.gridApi.selection.selectRow(entities[0]);
              }
            });
          });
        }
      } 
    };
    
    $scope.listOfAges.forEach(function( age ) {
      $scope.gridOptions.data.push({age: age});
    });
    
    var html = '<div class="modal" ng-style="{display: \'block\'}"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">Filter Ages</div><div class="modal-body"><div id="grid1" ui-grid="gridOptions" ui-grid-selection class="modalGrid"></div></div><div class="modal-footer"><button id="buttonClose" class="btn btn-primary" ng-click="close()">Filter</button></div></div></div></div>';
    $elm = angular.element(html);
    angular.element(document.body).prepend($elm);

    $compile($elm)($scope);
    
  };
  
  $scope.close = function() {
    var ages = $scope.gridApi.selection.getSelectedRows();
    $scope.colFilter.listTerm = [];
    
    ages.forEach( function( age ) {
      $scope.colFilter.listTerm.push( age.age );
    });
    
    $scope.colFilter.term = $scope.colFilter.listTerm.join(', ');
    $scope.colFilter.condition = new RegExp($scope.colFilter.listTerm.join('|'));
    
    if ($elm) {
      $elm.remove();
    }
  };
})


.directive('myCustomModal', function() {
  return {
    template: '<label>{{colFilter.term}}</label><button ng-click="showAgeModal()">...</button>',
    controller: 'myCustomModalCtrl'
  };
})
;
