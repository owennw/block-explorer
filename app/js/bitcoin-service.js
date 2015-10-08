(function() {
  'use strict';

  angular.module('blockChain.bitcoin', [])
    .factory('bitcoinService', ['$http', function($http) {
      var baseUrl = 'https://blockexplorer.com/api/';

      function fetchBlock(hash) {
        return fetch('block/' + hash);
      }

      function fetch(urlFragment) {
        return $http.get(baseUrl + urlFragment)
          .then(function(response) {
            return response.data;
          }, function(response) {
          return Error(response.message);
        });
      }

      function fetchLatestBlock() {
        return fetchLatestHash().then(fetchBlock);
      }

      function fetchHash(height) {
        return $http.get(baseUrl + 'block-index/' + height)
          .then(function(response) {
            return response.data.blockHash;
          }, function(response) {
            return Error(response.message);
          });
      }

      function fetchLatestHash() {
        return fetch('status?q=getLastBlockHash')
          .then(function(data) {
            return data.lastblockhash;
          });
      }

      return {
        fetchLatestBlock: fetchLatestBlock,
        fetchBlock: fetchBlock,
        fetchHash: fetchHash
      };
    }]);
})();
