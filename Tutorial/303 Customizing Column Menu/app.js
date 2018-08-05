var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  $scope.blargh = function() {
    alert("I'm in the outer scope!");
  };

  $scope.gridOptions = {
    enableSorting: true,
    columnDefs: [
      { field: 'name', enableColumnMenu: false },
      { field: 'gender', enableHiding: false, suppressRemoveSort: true, sort: { direction: uiGridConstants.ASC } },
      {
        field: 'company',
        menuItems: [
          {
            title: 'Outer Scope Alert',
            icon: 'ui-grid-icon-info-circled',
            action: function($event) {
              this.context.blargh(); // $scope.blargh() would work too, this is just an example
            },
            context: $scope
          },
          {
            title: 'Grid ID',
            action: function() {
              alert('Grid ID: ' + this.grid.id);
            }
          },
          {
            title: 'Column Title Alert',
            shown: function () {
              return this.context.col.displayName === 'Company';
            },
            action: function() {
              alert(this.context.col.displayName);
            }
          }
        ]
      }
    ]
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
