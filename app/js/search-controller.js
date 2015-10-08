(function() {
  'use strict';

  angular.module('blockChain.search', ['blockChain.bitcoin'])
    .controller('SearchCtrl', ['$http', '$q', '$routeParams', '$location', 'bitcoinService',
      function($http, $q, $routeParams, $location, bitcoinService) {
        var self = this;
        self.query = $routeParams.query;
        self.message = 'Searching...';

        function getHash() {
          var deferred;
          if (isHash(self.query)) {
            deferred = $q.defer();
            deferred.resolve({
              hash: self.query,
              error: false
            });
            return deferred.promise;
          } else if(isHeight(self.query)) {
            return bitcoinService.fetchHash(self.query)
              .then(function(hash) {
                return {
                  hash: hash,
                  error: false
                };
              })
          } else {
            // Invalid search input
            deferred = $q.defer();
            deferred.resolve({
              hash: self.query,
              error: true
            });
            return deferred.promise;
          }
        }

        this.submit = function() {
          getHash()
            .then(function(hashObject) {
              if (hashObject.error) {
                self.message = 'Input ' + hashObject.hash + ' not a valid hash or height.'
                self.query = '';
                return;
              }

              $location.path('/blocks/' + hashObject.hash);
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