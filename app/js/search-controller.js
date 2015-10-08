(function() {
  'use strict';

  angular.module('blockChain.search', ['blockChain.bitcoin'])
    .controller('SearchCtrl', ['$http', '$routeParams', '$location', 'bitcoinService',
      function($http, $routeParams, $location, bitcoinService) {
        var self = this;
        self.query = $routeParams.query;

        function getHash() {
          if (isHash(self.query)) {
            return Promise.resolve(self.query);
          } else if(isHeight(self.query)) {
            return bitcoinService.fetchHash(self.query)
              .then(function(hash) {
                return hash;
              })
          } else {
            // Invalid search input
          }
        }

        this.submit = function() {
          getHash()
            .then(function(hash) {
              $location.path('/blocks/' + hash);
              self.query = '';
            });
        };

        if(self.query) {
          // Here to prevent navigating back to view dirty data
          this.submit();
        }

        function isHash(input) {
          if (input.length !== 64) {
            return false;
          }

          var match = input.match(/^[a-f0-9]{64}$/);

          if(match) {
            return true;
          } else {
            return false;
          }
        }

        function isHeight(input) {
          var match = input.match(/^[0-9]+$/);

          if(match) {
            return true;
          } else {
            return false;
          }
        }
      }]);
})();