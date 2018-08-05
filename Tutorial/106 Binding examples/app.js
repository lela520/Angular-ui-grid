var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.edit']);

app.controller('MainCtrl', ['$scope', function ($scope) {

$scope.gridOptions = {
        enableSorting: true,
        columnDefs: [
          { name:'firstName', field: 'first-name' },
          { name:'1stFriend', field: 'friends[0]' },
          { name:'city', field: 'address.city'},
          { name:'getZip', field: 'getZip()', enableCellEdit:false}
        ],
        data : [      {
                           "first-name": "Cox",
                           "friends": ["friend0"],
                           "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
                           "getZip" : function() {return this.address.zip;}
                       }
                   ]
      };

}]);
