(function () {
  'use strict';

  angular.module('blockChain.forceGraph', [])
    .directive('txForceGraph', function () {
      return {
        restrict: 'E',
        link: function (scope, element, attrs) {
          console.log('hello world');
        }
      };
    });
}());