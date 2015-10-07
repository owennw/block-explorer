(function() {
  'use strict';

  angular.module('blockChain.bitcoin', [])
    .factory('bitcoinService', ['$http', function($http) {
      var baseUrl = 'https://blockexplorer.com/api/';

      function fetchLatestBlock() {
        return fetchLatestHash().then(fetchBlockFromHash);
      }

      function fetchBlock(height) {
        return fetchBlockHash(height)
          .then(fetchBlockFromHash);
      }

      function fetchBlockHash(height) {
        return $http.get(baseUrl + 'block-index/' + height)
          .then(function(response) {
            return response.data.blockHash;
          }, function(response) {
            return Error(response.message);
          });
      }

      function fetchLatestHash() {
        return $http.get(baseUrl + 'status?q=getLastBlockHash')
          .then(function(response) {
            return response.data.lastblockhash;
        })
      }

      function fetchBlockFromHash(hash) {
        return $http.get(baseUrl + 'block/' + hash)
          .then(function(response) {
            return response.data;
          }, function(response) {
            return Error(response.message);
          });
      }

      return {
        fetchLatestBlock: fetchLatestBlock,
        fetchBlock: fetchBlock
      };
    }]);
})();
