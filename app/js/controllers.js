(function() {
  'use strict';

  var blockChainControllers = angular.module('blockChainControllers', []);

  blockChainControllers.controller('BlockCtrl', ['$http', function($http) {
    var self = this;
    $http.get('blocks/blocks.json').success(function(data) {
      self.blocks = data;
      self.splitBlocks = splitArray(data, 5);
    });
  }]);

  function splitArray(array, split) {
    var output = [];
    for (var i = 0; i < array.length; i += split) {
      output.push(array.slice(i, i + split));
    }

    return output;
  }
})();