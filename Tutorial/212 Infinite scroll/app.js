var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.infiniteScroll']);

app.controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
  $scope.gridOptions = {
    infiniteScrollRowsFromEnd: 40,
    infiniteScrollUp: true,
    infiniteScrollDown: true,
    columnDefs: [
      { name:'id'},
      { name:'name' },
      { name:'age' }
    ],
    data: 'data',
    onRegisterApi: function(gridApi){
      gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.getDataDown);
      gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, $scope.getDataUp);
      $scope.gridApi = gridApi;
    }
  };

  $scope.data = [];

  $scope.firstPage = 2;
  $scope.lastPage = 2;

  $scope.getFirstData = function() {
    return $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pageshttps://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/10000_complex.json')
    .then(function(response) {
      var newData = $scope.getPage(response.data, $scope.lastPage);
      $scope.data = $scope.data.concat(newData);
    });
  };

  $scope.getDataDown = function() {
    return $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pageshttps://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/10000_complex.json')
    .then(function(response) {
      $scope.lastPage++;
      var newData = $scope.getPage(response.data, $scope.lastPage);
      $scope.gridApi.infiniteScroll.saveScrollPercentage();
      $scope.data = $scope.data.concat(newData);
      return $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage < 4).then(function() {$scope.checkDataLength('up');});
    })
    .catch(function(error) {
      return $scope.gridApi.infiniteScroll.dataLoaded();
    });
  };

  $scope.getDataUp = function() {
    return $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pageshttps://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/10000_complex.json')
    .then(function(response) {
      $scope.firstPage--;
      var newData = $scope.getPage(response.data, $scope.firstPage);
      $scope.gridApi.infiniteScroll.saveScrollPercentage();
      $scope.data = newData.concat($scope.data);
      return $scope.gridApi.infiniteScroll.dataLoaded($scope.firstPage > 0, $scope.lastPage < 4).then(function() {$scope.checkDataLength('down');});
    })
    .catch(function(error) {
      return $scope.gridApi.infiniteScroll.dataLoaded();
    });
  };

  $scope.getPage = function(data, page) {
    var res = [];
    for (var i = (page * 100); i < (page + 1) * 100 && i < data.length; ++i) {
      res.push(data[i]);
    }
    return res;
  };

  $scope.checkDataLength = function( discardDirection) {
    // work out whether we need to discard a page, if so discard from the direction passed in
    if( $scope.lastPage - $scope.firstPage > 3 ){
      // we want to remove a page
      $scope.gridApi.infiniteScroll.saveScrollPercentage();

      if( discardDirection === 'up' ){
        $scope.data = $scope.data.slice(100);
        $scope.firstPage++;
        $timeout(function() {
          // wait for grid to ingest data changes
          $scope.gridApi.infiniteScroll.dataRemovedTop($scope.firstPage > 0, $scope.lastPage < 4);
        });
      } else {
        $scope.data = $scope.data.slice(0, 400);
        $scope.lastPage--;
        $timeout(function() {
          // wait for grid to ingest data changes
          $scope.gridApi.infiniteScroll.dataRemovedBottom($scope.firstPage > 0, $scope.lastPage < 4);
        });
      }
    }
  };

  $scope.reset = function() {
    $scope.firstPage = 2;
    $scope.lastPage = 2;

    // turn off the infinite scroll handling up and down - hopefully this won't be needed after @swalters scrolling changes
    $scope.gridApi.infiniteScroll.setScrollDirections( false, false );
    $scope.data = [];

    $scope.getFirstData().then(function(){
      $timeout(function() {
        // timeout needed to allow digest cycle to complete,and grid to finish ingesting the data
        $scope.gridApi.infiniteScroll.resetScroll( $scope.firstPage > 0, $scope.lastPage < 4 );
      });
    });
  };

  $scope.getFirstData().then(function(){
    $timeout(function() {
      // timeout needed to allow digest cycle to complete,and grid to finish ingesting the data
      // you need to call resetData once you've loaded your data if you want to enable scroll up,
      // it adjusts the scroll position down one pixel so that we can generate scroll up events
      $scope.gridApi.infiniteScroll.resetScroll( $scope.firstPage > 0, $scope.lastPage < 4 );
    });
  });

}]);
