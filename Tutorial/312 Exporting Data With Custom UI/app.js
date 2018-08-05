var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.moveColumns']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.gridOptions = {
    columnDefs: [
      { field: 'name' },
      { field: 'gender', cellFilter: 'mapGender', exporterPdfAlign: 'right' },
      { field: 'company', visible: false }
    ],
    exporterLinkLabel: 'get your csv here',
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterHeaderFilter: function( displayName ) { 
      if( displayName === 'Name' ) { 
        return 'Person Name'; 
      } else { 
        return displayName;
      } 
    },
    exporterFieldCallback: function( grid, row, col, input ) {
      if( col.name == 'gender' ){
        switch( input ){
          case 1:
            return 'female';
            break;
          case 2:
            return 'male';
            break;
          default:
            return 'unknown';
            break;
        }
      } else {
        return input;
      }
    },
    onRegisterApi: function(gridApi){ 
      $scope.gridApi = gridApi;
    }
  };
  
  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      data.forEach( function( row, index ) {
        if( row.gender === 'female' ){
          row.gender = 1;
        } else {
          row.gender = 2;
        }
      });
      $scope.gridOptions.data = data;
    });
    
  
    
  $scope.export = function(){
    if ($scope.export_format == 'csv') {
      var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
      $scope.gridApi.exporter.csvExport( $scope.export_row_type, $scope.export_column_type, myElement );
    } else if ($scope.export_format == 'pdf') {
      $scope.gridApi.exporter.pdfExport( $scope.export_row_type, $scope.export_column_type );
    };
  };
}])

.filter('mapGender', function() {
  return function( input ) {
    switch( input ){
      case 1:
        return 'female';
        break;
      case 2:
        return 'male';
        break;
      default:
        return 'unknown';
        break;
    }
  };
});
