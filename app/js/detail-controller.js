(function() {
  'use strict';

  angular.module('blockChain.detail', ['blockChain.bitcoin'])
    .controller('BlockDetailCtrl', ['$http', '$routeParams', 'bitcoinService',
      function($http, $routeParams, bitcoinService) {
        var self = this;

        self.height = $routeParams.blockHeight;

        bitcoinService.fetchBlock(self.height)
          .then(function(block) {
            self.block = block;
          });
      }]);
})();