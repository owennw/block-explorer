(function () {
  'use strict';

  angular.module('blockChain.bitcoin', [])
    .factory('bitcoinService', ['$http', '$q', function ($http, $q) {
      var baseUrl = 'https://blockexplorer.com/api/';
      var blockCache = {};
      var txCache = {};

      function fetchTransaction(txId) {
        if (txCache[txId]) {
          return promise(txCache[txId]);
        }

        return fetch('tx/' + txId, txId, txCache);
      }

      function fetchBlock(hash) {
        if (blockCache[hash]) {
          return promise(blockCache[hash]);
        }

        return fetch('block/' + hash, hash, blockCache);
      }

      function fetchLatestBlock() {
        return fetchLatestHash().then(fetchBlock);
      }

      function fetchHash(height) {
        return fetch('block-index/' + height)
          .then(function (data) {
            return data.blockHash;
          }, function () {
            throw new Error('Cannot retrieve hash for height \'' + height + '\'');
          });
      }

      function fetchLatestHash() {
        return fetch('status?q=getLastBlockHash')
          .then(function (data) {
            return data.lastblockhash;
          });
      }

      function fetch(urlFragment, hash, cache) {
        return $http.get(baseUrl + urlFragment)
          .then(function (response) {
            if (hash) {
              cache[hash] = response.data;
            }

            return response.data;
          }, function () {
            throw new Error('Cannot find block with hash \'' + hash + '\'');
          });
      }

      function promise(item) {
        var deferred = $q.defer();
        deferred.resolve(item);
        return deferred.promise;
      }

      return {
        fetchTransaction: fetchTransaction,
        fetchLatestBlock: fetchLatestBlock,
        fetchBlock: fetchBlock,
        fetchHash: fetchHash
      };
    }]);
}());
