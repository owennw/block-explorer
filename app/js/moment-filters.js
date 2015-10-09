(function() {
  'use strict';

  angular.module('blockChain.momentFilters', [])
    .filter('momentFilter', function() {
      return function(date) {
        var instant = moment(date);
        var now = moment();
        var offset = now.diff(instant, 'minutes');

        if (offset < 90) {
          // 45 - 90 minutes maps to 'an hour ago'
          return instant.fromNow();
        } else {
          return instant.calendar(
            moment(), {
              lastWeek: 'ddd D MMM YYYY H:mm'
            });
        }
      };
    })
    .filter('tooltipFilter', function() {
      return function (date) {
        var instant = moment(date);
        return instant.format('ddd D MMM YYYY H:mm:ss');
      };
    });
})();