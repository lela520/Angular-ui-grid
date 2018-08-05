var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit']);

app.controller('OneDimensionCtrl', ['$scope', 'uiGridConstants', function ($scope, uiGridConstants) {

$scope.gridOptions = {
        enableSorting: true,
        columnDefs: [
          { name:'Name', field: uiGridConstants.ENTITY_BINDING }
        ],
        data : [
          "John Rogers",
          "David Michaels",
          "Andrew Johnson",
          "Donald McDonald"
        ]
      };
}]);


app.filter('calculatePercentage', function () {
  return function (input, resultField, maxField) {
    return Math.floor((input[resultField] * 100) / input[maxField]) + "%";
  };
});
app.controller('ComplexFilterCtrl', ['$scope', 'uiGridConstants', function ($scope, uiGridConstants) {

$scope.gridOptions = {
        enableSorting: true,
        columnDefs: [
          { name:'Exam', field: 'examName' },
          { name:'Possible Score', field: 'maxScore' },
          { name:'Your Score', field: 'actualScore' },
          { name:'Percentage', field: uiGridConstants.ENTITY_BINDING, cellFilter: 'calculatePercentage:"actualScore":"maxScore"', sortCellFiltered: true, enableCellEdit: false }
        ],
        data : [
          {
            examName: 'Basic Trig',
            maxScore: 105,
            actualScore: 77
          },
          {
            examName: 'Graph Theory',
            maxScore: 85,
            actualScore: 82
          },
          {
            examName: 'Counting',
            maxScore: 40,
            actualScore: 12
          },
        ]
      };
}]);
