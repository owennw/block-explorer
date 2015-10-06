(function() {
  'use strict';

  var blockChainExplorer = angular.module('blockChainExplorer', [
    'ngRoute',
    'blockChainControllers'
  ]);

  blockChainExplorer.config(['$routeProvider',  function($routeProvider) {
    $routeProvider
      .when('/blocks', {
        templateUrl: 'partials/block-list.html',
        controller: 'BlockCtrl',
        controllerAs: 'blockCtrl'
      })
      .when('/blocks/:blockHeight', {
        templateUrl: 'partials/block-detail.html',
        controller: 'BlockDetailCtrl',
        controllerAs: 'blockDetailCtrl'
      })
      .otherwise({
        redirectTo: '/blocks'
      });
  }]);

})();