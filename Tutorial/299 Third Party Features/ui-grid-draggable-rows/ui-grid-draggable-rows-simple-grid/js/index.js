var app = angular.module('app', ['ui.bootstrap', 'ui.grid', 'ui.grid.draggable-rows']);

app.controller('MainCtrl', function($scope) {

  $scope.gridOptions = {
    rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
    columnDefs: [{
      name: 'character',
      cellTemplate: '<div class="ui-grid-cell-contents"><strong>{{COL_FIELD}}</strong></div>'
    }, {
      name: 'realName'
    }, {
      name: 'gender'
    }],
    data: [{
      "character": "Spideman",
      "realName": "Peter Benjamin Parker",
      "gender": "Male",
    }, {
      "character": "Captain Marvel",
      "realName": "Carol Danvers",
      "gender": "Female"
    }, {
      "character": "Hulk",
      "realName": "Robert Bruce Banner",
      "gender": "Male",
    }, {
      "character": "Black Widow",
      "realName": "Natasha Romanova",
      "gender": "Female"
    }, {
      "character": "Thor",
      "realName": "Thor Odinson",
      "gender": "Male",
    }, {
      "character": "Iron Man",
      "realName": "Anthony Edward 'Tony' Stark",
      "gender": "Male",
    }, {
      "character": "Captain America",
      "realName": "Steven Rogers",
      "gender": "Male"
    }]
  };
});