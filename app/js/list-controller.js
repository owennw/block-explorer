(function() {
  'use strict';

  angular.module('blockChain.list', ['blockChain.bitcoin'])
    .controller('BlockListCtrl', ['$http', 'bitcoinService', function($http, bitcoinService) {
      var self = this;
      self.blocks = [];
      self.blockHeights = [];
      var numberOfBlocksToFetch = 10;

      bitcoinService.fetchLatestBlock()
        .then(function(block) {
          self.blocks.push(block);
          return block.height - 1;
        })
        .then(function(height) {
          self.blockHeights = fetchPreviousBlocks(height, numberOfBlocksToFetch);
        })
        .then(function() {
          return fetchBlocks(self.blockHeights)
        });

      self.loadPrevious = function() {
        var nextHeight = self.blockHeights.slice(-1) - 1;

      };

      function fetchPreviousBlocks(current, quantity) {
        var output = [];
        for (var i = 0; i < quantity; i += 1) {
          output.push(current - i);
        }

        return output;
      }

      function fetchBlocks(heights, sequence) {
        return heights.reduce(function(sequence, height) {
          return sequence.then(function() {
            return bitcoinService.fetchBlock(height);
          }).then(function(block) {
            self.blocks.push(block);
          });
        }, Promise.resolve());
      }
    }]);
})();