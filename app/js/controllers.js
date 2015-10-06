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

    getBlocks($http, callback);

    this.loadPrevious = function() {
      getBlocks($http, callback);
    };
  }]);

  blockChainControllers.controller('BlockDetailCtrl', ['$routeParams',
    function($routeParams) {
      this.blockHeight = $routeParams.blockHeight;
  }]);

  function getBlocks(http, callback) {
    http.get('blocks/blocks.json').success(callback);
  }

  function splitArray(array, split) {
    var output = [];
    for (var i = 0; i < array.length; i += split) {
      output.push(array.slice(i, i + split));
    }

    return output;
  }
})();