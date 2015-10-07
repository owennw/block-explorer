(function() {
  'use strict';

  angular.module('blockChain.detail', [])
    .controller('BlockDetailCtrl', ['$http', '$routeParams',
      function($http, $routeParams) {
        var self = this;

        self.height = $routeParams.blockHeight;

        getBlocks($http, 'blocks/block.json', function(response) {
          self.block = response.data;
        });
      }]);

  function getBlocks(http, url, callback) {
    http.get(url).then(callback);
  }
})();