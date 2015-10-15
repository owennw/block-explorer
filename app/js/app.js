(function () {
  'use strict';

  angular.module('blockChainExplorer', [
    'ngRoute',
    'blockChain.controls',
    'blockChain.list',
    'blockChain.detail',
    'blockChain.search',
    'blockChain.transaction',
    'blockChain.forceGraph'
  ])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          redirectTo: 'blocks'
        })
        .when('/blocks', {
          templateUrl: 'partials/block-list.html',
          controller: 'BlockListCtrl',
          controllerAs: 'blockListCtrl'
        })
        .when('/block/:blockHash', {
          templateUrl: 'partials/block-detail.html',
          controller: 'BlockDetailCtrl',
          controllerAs: 'blockDetailCtrl'
        })
        .when('/search/:query', {
          templateUrl: 'partials/search.html',
          controller: 'SearchCtrl',
          controllerAs: 'searchCtrl'
        })
        .when('/block/:blockHash/tx/:txHash', {
          templateUrl: 'partials/transaction-graph.html',
          controller: 'TransactionCtrl',
          controllerAs: 'txCtrl'
        })
        .otherwise({
          redirectTo: function () {
            window.location = '404.html';
          }
        });
    }]);
}());