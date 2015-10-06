(function() {
  'use strict';

  var blockChainControllers = angular.module('blockChainControllers', []);

  blockChainControllers.controller('BlockCtrl', ['$http', function($http) {
    var self = this;

    var callback = function(response) {
      var numberOfColumns = 6;
      self.blocks = response;
      self.splitBlocks = splitArray(response, numberOfColumns);
    }

    getBlocks($http, 'blocks/blocks.json', callback);

    self.loadPrevious = function() {
      getBlocks($http, 'blocks/blocks.json', callback);
    };
  }]);

  blockChainControllers.controller('BlockDetailCtrl', ['$http', '$routeParams',
    function($http, $routeParams) {
      var self = this;

      self.height = $routeParams.blockHeight;
      getBlocks($http, 'blocks/block.json', function(response) {
        self.block = response;
      });
  }]);

  function getBlocks(http, url, callback) {
    http.get(url).success(callback);
  }

  function splitArray(array, split) {
    var output = [];
    for (var i = 0; i < array.length; i += split) {
      output.push(array.slice(i, i + split));
    }

    return output;
  }
})();