(function() {
  'use strict';

  angular.module('blockChain.search', ['blockChain.bitcoin'])
    .controller('SearchCtrl', ['$http', '$q', '$routeParams', '$location', 'bitcoinService',
      function($http, $q, $routeParams, $location, bitcoinService) {
        var self = this;
        self.query = $routeParams.query;

        var alertType = 'alert-info';
        self.alertType = function() {
          return alertType;
        };

        var messageBody = 'Searching for block...';
        self.message = function() {
          return messageBody;
        };

        function getHash() {
          var deferred;
          if (isHash(self.query)) {
            deferred = $q.defer();
            deferred.resolve(self.query);
            return deferred.promise;
          } else if(isHeight(self.query)) {
            return bitcoinService.fetchHash(self.query)
              .then(function(hash) {
                  return hash;
              }, function(err) {
                throw err;
              })
          } else {
            // Invalid search input
            deferred = $q.defer();
            deferred.reject('Input \'' + self.query + '\' is not a valid hash or height.');
            return deferred.promise;
          }
        }

        this.submit = function() {
          getHash()
            .then(function(hash) {
              bitcoinService.fetchBlock(hash)
                .then(function() {
                  $location.path('/blocks/' + hash);
                }, function(err) {
                  handleError(err);
                });

            }, function(err) {
              handleError(err);
            });
        };

        if(self.query) {
          // Here to prevent navigating back to view dirty data
          this.submit();
        }

        function handleError(err) {
          messageBody = err;
          alertType = 'alert-danger';
        }

        function isHash(input) {
          if (input.length !== 64) {
            return false;
          }

          var match = input.match(/^[a-f0-9]{64}$/);

          if(match) {
            messageBody = 'Fetching block with hash \'' + input + '\'';
            return true;
          } else {
            return false;
          }
        }

        function isHeight(input) {
          var match = input.match(/^[0-9]+$/);

          if(match) {
            messageBody = 'Fetching block with height \'' + input + '\'';
            return true;
          } else {
            return false;
          }
        }
      }]);
})();