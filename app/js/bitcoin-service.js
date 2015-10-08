(function() {
  'use strict';

  angular.module('blockChain.bitcoin', [])
    .factory('bitcoinService', ['$http', '$q', function($http, $q) {
      var baseUrl = 'https://blockexplorer.com/api/';
      var cache = {};

      function fetchBlock(hash) {
        if (cache[hash]) {
          var deferred = $q.defer();
          deferred.resolve(cache[hash]);
          return deferred.promise;
        }

        return fetch('block/' + hash, hash);
      }

      function fetchLatestBlock() {
        return fetchLatestHash().then(fetchBlock);
      }

      function fetchHash(height) {
        return fetch('block-index/' + height)
          .then(function(data) {
            return data.blockHash;
          });
      }

      function fetchLatestHash() {
        return fetch('status?q=getLastBlockHash')
          .then(function(data) {
            return data.lastblockhash;
          });
      }

      function fetch(urlFragment, hash) {
        return $http.get(baseUrl + urlFragment)
          .then(function(response) {
            if (hash) {
              cache[hash] = response.data;
            }

            return response.data;
          }, function(response) {
            return Error(response.message);
          });
      }

      return {
        fetchLatestBlock: fetchLatestBlock,
        fetchBlock: fetchBlock,
        fetchHash: fetchHash
      };
    }]);
})();
