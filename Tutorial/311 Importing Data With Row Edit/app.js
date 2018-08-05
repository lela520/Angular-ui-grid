var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.importer', 'ui.grid.rowEdit', 'ui.grid.edit']);

app.controller('MainCtrl', ['$scope', '$http', '$interval', '$q', function ($scope, $http, $interval, $q) {
  $scope.data = [];
  $scope.gridOptions = {
    enableGridMenu: true,
    importerDataAddCallback: function( grid, newObjects ) {
      $scope.data = $scope.data.concat( newObjects );
    },
    onRegisterApi: function(gridApi){ 
      $scope.gridApi = gridApi;
      gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    },
    data: 'data'
  };

  $scope.saveRow = function( rowEntity ) {
    // create a fake promise - normally you'd use the promise returned by $http or $resource
    var promise = $q.defer();
    $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );
   
    // fake a delay of 3 seconds whilst the save occurs, return error if gender is "male"
    $interval( function() {
      if (rowEntity.Gender === 'male' ){
        promise.reject();
      } else {
        promise.resolve();
      }
    }, 3000, 1);
  };
  
  var handleFileSelect = function( event ){
    var target = event.srcElement || event.target;
    
    if (target && target.files && target.files.length === 1) {
      var fileObject = target.files[0];
      $scope.gridApi.importer.importFile( fileObject );
      target.form.reset();
    }
  };

  var fileChooser = document.querySelectorAll('.file-chooser');
  
  if ( fileChooser.length !== 1 ){
    console.log('Found > 1 or < 1 file choosers within the menu item, error, cannot continue');
  } else {
    fileChooser[0].addEventListener('change', handleFileSelect, false);  // TODO: why the false on the end?  Google  
  }
}]);
