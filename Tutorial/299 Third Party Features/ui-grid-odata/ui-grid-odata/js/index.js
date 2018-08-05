var app = angular.module('app', ['ui.grid', 'ui.grid.expandable', 'ui.grid.odata']);
  app.controller('MainCtrl', ['$scope', 'gridUtil', function($scope, gridUtil) {
    $scope.myGrid = {
      enableFiltering: true,
      showGridFooter: true,
      showColumnFooter: true,
      enableColumnMenus: true,
      expandableRowTemplate: 'ui-grid/odataExpandableRowTemplate',
      odata: {
        metadatatype: 'xml',
        datatype: 'json',
        expandable: 'subgrid',
        entitySet: 'Products',
        dataurl: "http://services.odata.org/V4/OData/OData.svc/Products",
        metadataurl: 'http://services.odata.org/V4/OData/OData.svc/$metadata',
        gencolumns: true
      }
    };

    $scope.myGrid.onRegisterApi = function(gridApi) {
      gridApi.expandable.on.rowExpandedStateChanged($scope, function(row) {
        gridUtil.logDebug('expanded: ' + row.entity.Description);
      });

      gridApi.odata.on.success($scope, function(grid) {
        gridUtil.logDebug('succeeded');
      });

      gridApi.odata.on.error($scope, function(data, message) {
        gridUtil.logError(message);
      });
    };
  }]);