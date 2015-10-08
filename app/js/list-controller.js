(function() {
  'use strict';

  angular.module('blockChain.list', ['blockChain.bitcoin'])
    .controller('BlockListCtrl', ['$http', 'bitcoinService', function($http, bitcoinService) {
      var self = this;
      self.blocks = [];
      self.viewOptions = [6, 10, 12, 16, 24, 48];
      self.viewNumber = 12;

      display();

      function display() {
        bitcoinService.fetchLatestBlock()
          .then(function (block) {
            self.blocks.push(block);
            return block.previousblockhash;
          })
          .then(function (previousHash) {
            fetchBlocks(previousHash, self.viewNumber - 1);
          });
      }

      self.loadPrevious = function() {
        var nextBlockHash = self.blocks.slice(-1)[0].previousblockhash;
        self.blocks = [];
        fetchBlocks(nextBlockHash, self.viewNumber);
      };

      self.viewChanged = function() {
        self.blocks = [];
        display();
      };

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