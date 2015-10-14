(function () {
  'use strict';

  angular.module('blockChain.transaction', [])
    .controller('TransactionCtrl', ['$routeParams', function ($routeParams) {
      var self = this;
      self.blockHash = $routeParams.blockHash;
      self.txHash = $routeParams.txHash;

      self.nodes = [
              { x: 500 / 3, y: 500 / 2 },
              { x: 2 * 500 / 3, y: 500 / 2 }
      ];
      self.links = [
            { source: 0, target: 1 }
      ];
    }]);
}());