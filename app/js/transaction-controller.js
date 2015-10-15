(function () {
  'use strict';

  angular.module('blockChain.transaction', ['blockChain.bitcoin'])
    .controller('TransactionCtrl', ['$routeParams', 'bitcoinService', function ($routeParams, bitcoinService) {
      var self = this;
      self.blockHash = $routeParams.blockHash;
      self.txHash = $routeParams.txHash;
      self.nodes = [{}, {}];
      self.links = [{ source: 0, target: 1 }];
      //self.nodes = [];
      //self.links = [];

      bitcoinService.fetchTransaction(self.txHash)
        .then(function (tx) {
          self.nodes.push({});
          self.links.push({ source: 0, target: 2 });
          //self.nodes.push({ txHash: self.txHash });
        });
    }]);
}());
