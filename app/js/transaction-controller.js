(function () {
  'use strict';

  angular.module('blockChain.transaction', ['blockChain.bitcoin'])
    .controller('TransactionCtrl', ['$routeParams', '$q', 'bitcoinService',
      function ($routeParams, $q, bitcoinService) {
        var self = this;
        self.blockHash = $routeParams.blockHash;
        self.txHash = $routeParams.txHash;
        self.nodes = [];
        self.links = [];
        var newNodes = [];
        var newLinks = [];
        var expandDisabled = false;

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
              var promises = expandTransaction(self.txHash, rootNode);

              run(promises);
            });
        }

        function run(promises) {
          $q.all(promises)
            .then(function () {
              self.links = self.links.concat(newLinks);
              self.nodes = self.nodes.concat(newNodes);

              newNodes = [];
              newLinks = [];
              expandDisabled = false;
            });
        }

        function expandTransaction(txHash, node) {
          var txValue = dict.get(txHash);
          var txs = txValue.tx.vin;
          var promises = [];

          function fetch(hash, node) {
            var deferred = $q.defer();
            deferred.resolve(
              bitcoinService.fetchTransaction(hash)
                .then(addNodeAndLink)
                .then(function () { node.expanded = true; }));
            return deferred.promise;
          }

          function addNodeAndLink(tx) {
            var myId = self.nodes.length + newNodes.length;

            var terminal = tx.vin[0].txid === undefined;
            var newNode = createNode(tx.txid, false, false, terminal);

            dict.add(tx.txid, tx, myId);

            newNodes.push(newNode);
            newLinks.push({ source: txValue.id, target: myId });
          }

          for (var i = 0, max = txs.length; i < max; i += 1) {
            var nextTxHash = txs[i].txid;

            if (nextTxHash) {
              promises.push(fetch(nextTxHash, node));
            }
          }

          return promises;
        }

        self.expand = function (node, layer) {
          if (!node.expanded && !node.terminal) {
            var promises = expandTransaction(node.txHash, node);

            if (!layer) {
              run(promises);
            }

            return promises;
          }
        };

        self.expandLayer = function () {
          expandDisabled = true;
          var tempNodes = self.nodes;
          var promises = [];
          tempNodes.forEach(function (node) {
            if (!node.expanded) {
              promises = promises.concat(self.expand(node, true));
            }
          });

          run(promises);
        };

        self.nodeCount = function () {
          return self.nodes.length;
        };

        self.expandDisabled = function () {
          return expandDisabled;
        };

        initialise();
      }]);
}());
