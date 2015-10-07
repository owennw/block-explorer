(function() {
  'use strict';

  angular.module('blockChain.bitcoin', [])
    .factory('bitcoinService', ['$http', function($http) {
      var baseUrl = 'https://blockexplorer.com/api/';

      function fetchBlock(hash) {
        return $http.get(baseUrl + 'block/' + hash)
          .then(function(response) {
            return response.data;
          }, function(response) {
            return Error(response.message);
          });
      }

      function fetchLatestBlock() {
        return fetchLatestHash().then(fetchBlock);
      }

      function fetchLatestHash() {
        return $http.get(baseUrl + 'status?q=getLastBlockHash')
          .then(function(response) {
            return response.data.lastblockhash;
        })
      }

      return {
        fetchLatestBlock: fetchLatestBlock,
        fetchBlock: fetchBlock
      };
    }]);
})();
