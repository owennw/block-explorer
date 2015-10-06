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
      .otherwise({
        redirectTo: '/blocks'
      });
  }]);

})();