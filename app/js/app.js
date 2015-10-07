(function() {
  'use strict';

  angular.module('blockChainExplorer', [
    'ngRoute',
    'blockChain.list',
    'blockChain.detail'
  ])
    .config(['$routeProvider',  function($routeProvider) {
    $routeProvider
      .when('/blocks', {
        templateUrl: 'partials/block-list.html',
        controller: 'BlockListCtrl',
        controllerAs: 'blockListCtrl'
      })
      .when('/blocks/:blockHash', {
        templateUrl: 'partials/block-detail.html',
        controller: 'BlockDetailCtrl',
        controllerAs: 'blockDetailCtrl'
      })
      .otherwise({
        redirectTo: '/blocks'
      });
  }]);
})();