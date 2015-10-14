(function () {
  'use strict';

  angular.module('blockChain.transaction', [])
    .controller('TransactionCtrl', ['$routeParams', function ($routeParams) {
      var self = this;
      self.blockHash = $routeParams.blockHash;
      self.txHash = $routeParams.txHash;

      self.nodes = [
        { x: 200, y: 250 },
        { x: 300, y: 400 }
      ];
      self.links = [
        { source: 0, target: 1 }
      ];
    }]);
}());