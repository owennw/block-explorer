(function() {
  'use strict';

  angular.module('blockChain.list', ['blockChain.bitcoin'])
    .controller('BlockListCtrl', ['$http', 'bitcoinService', function($http, bitcoinService) {
      var self = this;
      self.blocks = [];
      self.blockHeights = [];
      var numberOfBlocksToFetch = 12;

      bitcoinService.fetchLatestBlock()
        .then(function(block) {
          return block.height;
        })
        .then(function(height) {
          self.blockHeights = fetchHeights(height, numberOfBlocksToFetch);
        })
        .then(function() {
          self.blocks= [];
          fetchBlocks(self.blockHeights);
        });

      self.loadPrevious = function() {
        var nextHeight = self.blockHeights.slice(-1) - 1;
        self.blockHeights = fetchHeights(nextHeight, numberOfBlocksToFetch);
        fetchBlocks(self.blockHeights);
      };

      function fetchHeights(current, quantity) {
        var output = [];
        for (var i = 0; i < quantity; i++) {
          output.push(current - i);
        }

        return output;
      }

      function fetchBlocks(heights) {
        if (heights.length === 0) {
          return;
        }

        bitcoinService.fetchBlock(heights.shift())
          .then(function(block) {
            self.blocks.push(block);
            fetchBlocks(heights);
          });
      }
    }]);
})();