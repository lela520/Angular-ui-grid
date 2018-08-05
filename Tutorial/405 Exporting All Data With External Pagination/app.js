var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.exporter']);

app.controller('MainCtrl', [
  '$scope', '$http', 'uiGridConstants', function($scope, $http, uiGridConstants) {

    var paginationOptions = {
      sort: null
    };

    $scope.gridOptions = {
      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,
      useExternalPagination: true,
      useExternalSorting: true,
      enableGridMenu: true,
      columnDefs: [
        { name: 'name' },
        { name: 'gender', enableSorting: false },
        { name: 'company', enableSorting: false }
      ],
      exporterAllDataFn: function() {
        return getPage(1, $scope.gridOptions.totalItems, paginationOptions.sort)
        .then(function() {
          $scope.gridOptions.useExternalPagination = false;
          $scope.gridOptions.useExternalSorting = false;
          getPage = null;
        });
      },
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
          if(getPage) {
            if (sortColumns.length > 0) {
              paginationOptions.sort = sortColumns[0].sort.direction;
            } else {
              paginationOptions.sort = null;
            }
            getPage(grid.options.paginationCurrentPage, grid.options.paginationPageSize, paginationOptions.sort)
          }
        });
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          if(getPage) {
            getPage(newPage, pageSize, paginationOptions.sort);
          }
        });
      }
    };

    var getPage = function(curPage, pageSize, sort) {
      var url;
      switch(sort) {
        case uiGridConstants.ASC:
          url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
          break;
        case uiGridConstants.DESC:
          url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
          break;
        default:
          url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
          break;
      }

      var _scope = $scope;
      return $http.get(url)
      .success(function (data) {
        var firstRow = (curPage - 1) * pageSize;
        $scope.gridOptions.totalItems = 100;
        $scope.gridOptions.data = data.slice(firstRow, firstRow + pageSize)
      });
    };

    getPage(1, $scope.gridOptions.paginationPageSize);
  }
]);
