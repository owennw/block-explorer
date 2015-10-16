(function () {
  'use strict';

  angular.module('blockChain.transaction', ['blockChain.bitcoin'])
    .controller('TransactionCtrl', ['$routeParams', 'bitcoinService', function ($routeParams, bitcoinService) {
      var self = this;
      self.blockHash = $routeParams.blockHash;
      self.txHash = $routeParams.txHash;
      self.nodes = [];
      self.links = [];

      function createDict() {
        // prevent outside access to this dictionary
        var txDict = {};
        return {
          add: function (txHash, tx, id) {
            txDict[txHash] = { id: id, tx: tx };
          },
          get: function (txHash) {
            return txDict[txHash];
          }
        };
      }

      var dict = createDict();

      function createNode(hash, expanded, root, terminal) {
        return { txHash: hash, expanded: expanded, root: root, terminal: terminal };
      }

      function initialise() {
        bitcoinService.fetchTransaction(self.txHash)
          .then(function (tx) {
            var rootNode = createNode(self.txHash, false, true, null);
            self.nodes.push(rootNode);
            dict.add(self.txHash, tx, 0);
            expandTransaction(self.txHash);
            rootNode.expanded = true;
          });
      }

      function expandTransaction(txHash) {
        var txValue = dict.get(txHash);
        var txs = txValue.tx.vin;
        var txCallback = function (tx) {
          var myId = id();

          var terminal = tx.vin[0].txid === undefined;
          var newNode = createNode(tx.txid, false, false, terminal);

          dict.add(tx.txid, tx, myId);

          self.nodes.push(newNode);
          self.links.push({ source: txValue.id, target: myId });
        };

        for (var i = 0, max = txs.length; i < max; i += 1) {
          var nextTxHash = txs[i].txid;

          if (nextTxHash) {
            bitcoinService.fetchTransaction(nextTxHash)
              .then(txCallback);
          }
        }
      }

      self.expand = function (node) {
        if (!node.expanded && !node.terminal) {
          expandTransaction(node.txHash);
          node.expanded = true;
        }
      };

      self.expandLayer = function () {
        var tempNodes = self.nodes;
        tempNodes.forEach(function (node) {
          if (!node.expanded) {
            self.expand(node);
          }
        });
      };

      self.nodeCount = function () {
        return self.nodes.length;
      };

      function id() {
        return self.nodes.length;
      }

      initialise();
    }]);
}());
