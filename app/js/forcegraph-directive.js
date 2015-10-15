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
            width = 1200 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

          var svg = d3.select(element[0]).append('svg')
            .attr({
              width: width + margin.left + margin.right,
              height: height + margin.top + margin.bottom
            });

          svg.append('rect')
            .attr({
              class: 'force',
              width: width,
              height: height
            });

          var force = d3.layout.force()
            .size([width, height])
            .linkDistance(60);

          var tick = function (node, link, radius) {
            node
              .attr({
                r: radius,
                cx: function (d) { return d.x; },
                cy: function (d) { return d.y; }
              });

            link
              .attr({
                x1: function (d) { return d.source.x; },
                y1: function (d) { return d.source.y; },
                x2: function (d) { return d.target.x; },
                y2: function (d) { return d.target.y; }
              });
          };

          var render = function (nodes, links) {
            force
              .nodes(nodes)
              .links(links);

            var link = svg.selectAll('.link')
              .data(links).enter()
                .append('line')
                .attr('class', 'link');

            var node = svg.selectAll('.node')
              .data(nodes).enter()
                .append('circle')
                .attr('class', 'node');

            force.on('tick', function () {
              tick(node, link, 10);
            });

            force.start();
          };

          var renderHelper = function () {
            render(scope.nodes, scope.links);
          };

          //scope.$watch('nodes', renderHelper, true);
          renderHelper();
        }
      };
    });
}());