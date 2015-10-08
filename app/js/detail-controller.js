(function() {
  'use strict';

  angular.module('blockChain.detail', ['blockChain.bitcoin'])
    .controller('BlockDetailCtrl', ['$http', '$location', '$routeParams', 'bitcoinService',
      function($http, $location, $routeParams, bitcoinService) {
        var self = this;

        self.blockHash = $routeParams.blockHash;

        bitcoinService.fetchBlock(self.blockHash)
          .then(function(block) {
            self.block = block;
            self.previousDisabled = self.block.previousblockhash === undefined;
            self.nextDisabled = self.block.nextblockhash === undefined;
          });

        self.previous = function() {
          $location.path('/blocks/' + self.block.previousblockhash);
        }

        self.next = function() {
          $location.path('/blocks/' + self.block.nextblockhash);
        }
      }]);
})();