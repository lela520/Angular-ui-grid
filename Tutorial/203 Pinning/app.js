var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.pinning']);

app.controller('MainCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {
  $scope.gridOptions = {};

  $scope.gridOptions.columnDefs = [
    { name:'id', width:50, enablePinning:false },
    { name:'name', width:100, pinnedLeft:true },
    { name:'age', width:100, pinnedRight:true  },
    { name:'address.street', width:150  },
    { name:'address.city', width:150 },
    { name:'address.state', width:50 },
    { name:'address.zip', width:50 },
    { name:'company', width:100, pinnedLeft:true },
    { name:'email', width:100 },
    { name:'phone', width:200 },
    { name:'about', width:300 },
    { name:'friends[0].name', displayName:'1st friend', width:150 },
    { name:'friends[1].name', displayName:'2nd friend', width:150 },
    { name:'friends[2].name', displayName:'3rd friend', width:150 },
  ];

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      $scope.gridOptions.data = data;
    });
}]);
