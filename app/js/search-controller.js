(function() {
  'use strict';

  angular.module('blockChain.search', ['blockChain.bitcoin'])
    .controller('SearchCtrl', ['$http', '$routeParams', '$location', 'bitcoinService',
      function($http, $routeParams, $location, bitcoinService) {
        var self = this;
        self.hash = '';
        var submitted = false;

        function getHash() {
          if (isHash(self.query)) {
            self.hash = self.query;
          } else if(isHeight(self.query)) {
            return bitcoinService.fetchHash(self.query)
              .then(function(hash) {
                self.hash = hash;
              })
          } else {
            // Invalid search input
          }
        }

        this.submit = function() {
          submitted = true;
          getHash()
            .then(function() {
              return bitcoinService.fetchBlock(self.hash)
                .then(function(block) {
                  self.block = block;
                  $location.path('/blocks/' + self.block.hash);
                  self.query = '';
                });
            });
        };

        function isHash(input) {
          return false;
        }

        function isHeight(input) {
          return true;
        }
      }]);
})();