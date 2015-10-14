(function () {
  'use strict';

  angular.module('blockChain.transaction', [])
    .controller('TransactionCtrl', ['$routeParams', function ($routeParams) {
      var self = this;
      self.blockHash = $routeParams.blockHash;
      self.txHash = $routeParams.txHash;

      self.nodes = [{}, {}];
      self.links = [
        { source: 0, target: 1 }
      ];
    }]);
}());