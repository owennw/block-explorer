(function() {
  'use strict';

  var blockChainExplorer = angular.module('blockChainExplorer', []);

  blockChainExplorer.controller('BlockCtrl', ['$http', function($http) {
    var self = this;
    $http.get('blocks/blocks.json').success(function(data) {
      self.blocks = data;
    });
  }]);
})();