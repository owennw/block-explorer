(function () {
  'use strict';

  angular.module('blockChain.transaction', ['blockChain.bitcoin'])
    .controller('TransactionCtrl', ['$routeParams', 'bitcoinService', function ($routeParams, bitcoinService) {
      var self = this;
      self.blockHash = $routeParams.blockHash;
      self.txHash = $routeParams.txHash;
      self.nodes = [];
      self.links = [];
      var txDict = {};

      function initialise() {
        bitcoinService.fetchTransaction(self.txHash)
          .then(function (tx) {
            var newNode = { txHash: self.txHash, expanded: false };
            self.nodes.push(newNode);
            addToDict(tx, 0, newNode);
            expandTransaction(tx);
          });
      }

      function expandTransaction(tx) {
        var txs = tx.vin;
        var parent = fetchFromDict(tx);
        for (var i = 0, max = txs.length; i < max; i += 1) {
          fetchTransaction(txs[i].txid, parent.id);
        }

        parent.node.expanded = true;
      }

      function fetchTransaction(txHash, parentId) {
        bitcoinService.fetchTransaction(txHash)
          .then(function (tx) {
            var myId = id();
            var newNode = { txHash: tx.txid, expanded: false };
            
            addToDict(tx, myId, newNode);

            self.nodes.push(newNode);
            self.links.push({ source: parentId, target: myId });
          });
      }

      function addToDict(tx, id, node) {
        txDict[tx] = { id: id, node: node };
      }

      function fetchFromDict(tx) {
        return txDict[tx];
      }

      function id() {
        return self.nodes.length;
      }

      self.expand = function (item) {
        expandTransaction(item.txHash);
      };

      initialise();
    }]);
}());
