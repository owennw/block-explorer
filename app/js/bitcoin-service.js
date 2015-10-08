(function() {
  'use strict';

  angular.module('blockChain.bitcoin', [])
    .factory('bitcoinService', ['$http', function($http) {
      var baseUrl = 'https://blockexplorer.com/api/';

      function fetchBlock(hash) {
        return fetch('block/' + hash);
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

      function fetch(urlFragment) {
        return $http.get(baseUrl + urlFragment)
          .then(function(response) {
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
