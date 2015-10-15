(function () {
  'use strict';

  angular.module('blockChain.controls', [])
    .directive('navButtons', function () {
      return {
        restrict: 'E',
        scope: {
          prevDisabled: '=',
          nextDisabled: '=',
          prevClick: '&',
          nextClick: '&'
        },
        templateUrl: './partials/buttons.html'
      };
    });
}());