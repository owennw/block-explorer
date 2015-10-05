(function() {
  'use strict';

  var blockChainExplorer = angular.module('blockChainExplorer', []);

  blockChainExplorer.controller('BlockCtrl', ['$http', function($http) {
    console.log('hello');
    $http.get('blocks/blocks.json').success(function(data) {
      this.blocks = data;
    });
  }]);
})();