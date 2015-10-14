(function () {
  'use strict';

  angular.module('blockChain.forceGraph', [])
    .directive('txForceGraph', function () {
      return {
        restrict: 'E',
        scope: {
          nodes: '=',
          links: '='
        },
        link: function (scope, element, attrs) {
          var margin = { top: 10, right: 10, bottom: 10, left: 10 },
            width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

          var svg = d3.select(element[0]).append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

          var radius = 5;

          var force = d3.layout.force()
            .size([width, height])
            .linkDistance(20);

          var render = function (nodes, links) {
            force
              .nodes(nodes)
              .links(links);

            var link = svg.selectAll('.link')
              .data(links).enter()
                .append('line')
                .attr('class', 'link')
                .attr('stroke', '#777');

            var node = svg.selectAll('.node')
              .data(nodes).enter()
                .append('circle')
                .attr('class', 'node');

            force.on('tick', function () {
              var animationDuration = 50;

              node
                .transition()
                .ease('linear')
                .duration(animationDuration)
                .attr({
                  r: radius,
                  cx: function (d) { return d.x; },
                  cy: function (d) { return d.y; }
                });

              link
                .transition()
                .ease('linear')
                .duration(animationDuration)
                .attr({
                  x1: function (d) { return d.source.x; },
                  y1: function (d) { return d.source.y; },
                  x2: function (d) { return d.target.x; },
                  y2: function (d) { return d.target.y; }
                });

              force.stop();

              setTimeout(
                function () { force.start(); },
                animationDuration);
            });

            force.start();
          };

          render(scope.nodes, scope.links);
        }
      };
    });
}());