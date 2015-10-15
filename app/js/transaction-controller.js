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
            var newNode = { txHash: self.txHash, expanded: false, root: true };
            self.nodes.push(newNode);
            addToDict(self.txHash, tx, 0);
            expandTransaction(self.txHash);
            newNode.expanded = true;
          });
      }

      function expandTransaction(txHash) {
        var parent = fetchFromDict(txHash);
        var txs = parent.tx.vin;
        for (var i = 0, max = txs.length; i < max; i += 1) {
          addTx(txs[i].txid, parent.id);
        }
      }

      function addTx(txHash, parentId) {
        bitcoinService.fetchTransaction(txHash)
          .then(function (tx) {
            var myId = id();
            var newNode = { txHash: tx.txid, expanded: false, root: false };

            addToDict(txHash, tx, myId);

            self.nodes.push(newNode);
            self.links.push({ source: parentId, target: myId });
          });
      }

      function addToDict(txHash, tx, id) {
        txDict[txHash] = { id: id, tx: tx };
      }

      function fetchFromDict(txHash) {
        return txDict[txHash];
      }

      function id() {
        return self.nodes.length;
      }

      self.expand = function (node) {
        expandTransaction(node.txHash);
        node.expanded = true;
      };

      initialise();
    }]);
}());
