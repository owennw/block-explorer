(function () {
  'use strict';

  angular.module('blockChainExplorer', [
    'ngRoute',
    'blockChain.list',
    'blockChain.detail',
    'blockChain.search'
  ])
    .config(['$routeProvider', function ($routeProvider) {
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
        .when('/search/:query', {
          templateUrl: 'partials/search.html',
          controller: 'SearchCtrl',
          controllerAs: 'searchCtrl'
        })
        .otherwise({
          redirectTo: '/blocks'
        });
    }]);
}());