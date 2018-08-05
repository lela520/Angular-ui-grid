var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.formatters = {};

  $scope.gridOptions = {
    columnDefs: [
      { field: 'name' },
      { field: 'gender', visible: false},
      { field: 'company' }
    ],
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'myFile.csv',
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
    exporterPdfFooter: function ( currentPage, pageCount ) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function ( docDefinition ) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    exporterExcelFilename: 'myFile.xlsx',
    exporterExcelSheetName: 'Sheet1',
    exporterExcelCustomFormatters: function ( grid, workbook, docDefinition ) {

      var stylesheet = workbook.getStyleSheet();
      var aFormatDefn = {
        "font": { "size": 9, "fontName": "Calibri", "bold": true },
        "alignment": { "wrapText": true }
      };
      var formatter = stylesheet.createFormat(aFormatDefn);
      // save the formatter
      $scope.formatters['bold'] = formatter;

      aFormatDefn = {
        "font": { "size": 9, "fontName": "Calibri" },
        "fill": { "type": "pattern", "patternType": "solid", "fgColor": "FFFFC7CE" },
        "alignment": { "wrapText": true }
      };
      formatter = stylesheet.createFormat(aFormatDefn);
      // save the formatter
      $scope.formatters['red'] = formatter;

      Object.assign(docDefinition.styles , $scope.formatters);

      return docDefinition;
    },
    exporterExcelHeader: function (grid, workbook, sheet, docDefinition) {
        // this can be defined outside this method
        var stylesheet = workbook.getStyleSheet();
        var aFormatDefn = {
                "font": { "size": 9, "fontName": "Calibri", "bold": true },
                "alignment": { "wrapText": true }
              };
        var formatterId = stylesheet.createFormat(aFormatDefn);

        sheet.mergeCells('B1', 'C1');
        var cols = [];
        cols.push({ value: '' });
        cols.push({ value: 'My header that is long enough to wrap', metadata: {style: formatterId.id} });
        sheet.data.push(cols);
    },
    exporterFieldFormatCallback: function(grid, row, gridCol, cellValue) {
     // set metadata on export data to set format id. See exportExcelHeader config above for example of creating
     // a formatter and obtaining the id
     var formatterId = null;
     if (cellValue && cellValue.startsWith('W')) {
       formatterId = $scope.formatters['red'].id;
     }

     if (formatterId) {
       return {metadata: {style: formatterId}};
     } else {
       return null;
     }
   },
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
  .success(function(data) {
    $scope.gridOptions.data = data;
  });

}]);
