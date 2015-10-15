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
        template: '<button type="button" class="btn btn-default pull-right"' +
                      'ng-disabled="nextDisabled" ng-click="nextClick()">' +
                      'Next <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
                  '</button>' +
                  '<button type="button" class="btn btn-default pull-right"' +
                          'ng-disabled="prevDisabled" ng-click="prevClick()">' +
                      '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span> Previous' +
                  '</button>'
      };
    });
}());