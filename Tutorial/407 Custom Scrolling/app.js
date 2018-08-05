var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {
  $scope.scroll ={
   top: 0,
   left: 0
  };

  $scope.gridOptions = {
    customScroller: function myScrolling(uiGridViewport, scrollHandler) {
      uiGridViewport.on('scroll', function myScrollingOverride(event) {
        $scope.scroll.top = uiGridViewport[0].scrollTop;
        $scope.scroll.left = uiGridViewport[0].scrollLeft;

        // You should always pass the event to the callback since ui-grid needs it
        scrollHandler(event);
      });
    }
  };

  $scope.gridOptions.columnDefs = [
    { name:'id', width:50 },
    { name:'name', width:100 },
    { name:'age', width:100 },
    { name:'address.street', width:150  },
    { name:'address.city', width:150 },
    { name:'address.state', width:50 },
    { name:'address.zip', width:50 },
    { name:'company', width:100 },
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
