(function() {
  'use strict';

  angular.module('blockChain.detail', ['blockChain.bitcoin'])
    .controller('BlockDetailCtrl', ['$http', '$routeParams', 'bitcoinService',
      function($http, $routeParams, bitcoinService) {
        var self = this;

        self.blockHash = $routeParams.blockHash;

        bitcoinService.fetchBlock(self.blockHash)
          .then(function(block) {
            self.block = block;
          });
      }]);
})();