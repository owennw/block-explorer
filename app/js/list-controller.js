(function() {
  'use strict';

  angular.module('blockChain.list', ['blockChain.bitcoin'])
    .controller('BlockListCtrl', ['$http', 'bitcoinService', function($http, bitcoinService) {
      var self = this;
      self.blocks = [];
      self.blockHeights = [];
      var numberOfBlocksToFetch = 10;

      var sequence = Promise.resolve();

      bitcoinService.fetchLatestBlock()
        .then(function(block) {
          self.blocks.push(block);
          return block.height - 1;
        })
        .then(function(height) {
          for (var i = 0; i < numberOfBlocksToFetch; i += 1) {
            self.blockHeights.push(height - i);
          }
        })
        .then(function() {
          return self.blockHeights.reduce(function(sequence, height) {
            return sequence.then(function() {
              return bitcoinService.fetchBlock(height);
            }).then(function(block) {
                self.blocks.push(block);
              });
          }, Promise.resolve())
        });

      self.loadPrevious = function() {
        //getBlocks($http, 'blocks/blocks.json', callback);
      };
    }]);
})();