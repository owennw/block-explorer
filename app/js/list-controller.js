(function() {
  'use strict';

  angular.module('blockChain.list', ['blockChain.bitcoin'])
    .controller('BlockListCtrl', ['$http', 'bitcoinService', function($http, bitcoinService) {
      var self = this;
      self.blocks = [];
      var numberOfBlocksToFetch = 12;

      bitcoinService.fetchLatestBlock()
        .then(function(block) {
          self.blocks.push(block);
          return block.previousblockhash;
        })
        .then(function(previousHash) {
          fetchBlocks(previousHash, numberOfBlocksToFetch - 1);
        });

      self.loadPrevious = function() {
        var nextBlockHash = self.blocks.slice(-1)[0].previousblockhash;
        self.blocks = [];
        fetchBlocks(nextBlockHash, numberOfBlocksToFetch);
      };

      function fetchHeights(current, quantity) {
        var output = [];
        for (var i = 0; i < quantity; i++) {
          output.push(current - i);
        }

        return output;
      }

      function fetchBlocks(hash, count) {
        if (count === 0) {
          return;
        }

        bitcoinService.fetchBlock(hash)
          .then(function(block) {
            self.blocks.push(block);
            fetchBlocks(block.previousblockhash, count - 1);
          });
      }
    }]);
})();