var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$rootScope', '$scope', '$http', 'modal', '$interval', function ($rootScope, $scope, $http, modal, $interval) {
  var myModal = new modal();

  $scope.hideGrid = true;

  $rootScope.gridOptions = {
    onRegisterApi: function (gridApi) {
      $scope.gridApi = gridApi;

      // call resize every 500 ms for 5 s after modal finishes opening - usually only necessary on a bootstrap modal
      $interval( function() {
        $scope.gridApi.core.handleWindowResize();
      }, 500, 10);
      }
  };

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json')
    .success(function(data) {
      $rootScope.gridOptions.data = data;
    });

  $scope.showModal = function() {
    myModal.open();
  };
}]);

app.factory('modal', ['$compile', '$rootScope', function ($compile, $rootScope) {
  return function() {
    var elm;
    var modal = {
      open: function() {

        var html = '<div class="modal" ng-style="modalStyle">{{modalStyle}}<div class="modal-dialog"><div class="modal-content"><div class="modal-header"></div><div class="modal-body"><div id="grid1" ui-grid="gridOptions" class="grid"></div></div><div class="modal-footer"><button id="buttonClose" class="btn btn-primary" ng-click="close()">Close</button></div></div></div></div>';
        elm = angular.element(html);
        angular.element(document.body).prepend(elm);

        $rootScope.close = function() {
          modal.close();
        };

        $rootScope.modalStyle = {"display": "block"};

        $compile(elm)($rootScope);
      },
      close: function() {
        if (elm) {
          elm.remove();
        }
      }
    };

    return modal;
  };
}]);
