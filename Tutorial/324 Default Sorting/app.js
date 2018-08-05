var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  $scope.gridOptions = {
    data: [
       { name: "David Johnson", memberNo: 6014, company: "Softsoft" },
       { name: "Brian Davidson", memberNo: 4432, company: "Roundwheel" },
       { name: "Peter Anderson", memberNo: 8725, company: "Softsoft" },
       { name: "John Johnson", memberNo: 5326, company: "Initech" },
       { name: "Andrew Thomson", memberNo: 6416, company: "Roundwheel" },
       { name: "Brian Davidson", memberNo: 9134, company: "Initech" }
    ],
    enableSorting: true,
    columnDefs: [
      { field: 'name', sort: { direction: uiGridConstants.ASC, priority: 1 } },
      { field: 'memberNo', defaultSort: { direction: uiGridConstants.ASC } },
      { field: 'company' }
    ],
    onRegisterApi: function( gridApi ) {
      $scope.grid1Api = gridApi;
    }
  };

}]);
