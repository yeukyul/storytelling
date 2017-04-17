HTMLWidgets.widget({

  name: 'sunburst',

  type: 'output',

  factory: function(el, width, height) {

      // Dimensions of sunburst.
      var radius = Math.min(width, height) / 2;
      
      // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
      var b = {
        w: 75, h: 30, s: 3, t: 10
      };
      
      // Mapping of step names to colors.
      var colors = {
        "home": "#5687d1",
        "product": "#7b615c",
        "search": "#de783b",
        "account": "#6ab975",
        "other": "#a173d1",
        "end": "#bbbbbb"
      };
      
      // Total size of all segments; we set this later, after loading the data.
      var totalSize = 0; 
      
      var vis = d3.select(el).append("svg:svg")
          .attr("width", width)
          .attr("height", height)
          .append("svg:g")
          .attr("id", "container")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      
      var partition = d3.layout.partition()
          .size([2 * Math.PI, radius * radius])
          .value(function(d) { return d.size; });
      
      var arc = d3.svg.arc()
          .startAngle(function(d) { return d.x; })
          .endAngle(function(d) { return d.x + d.dx; })
          .innerRadius(function(d) { return Math.sqrt(d.y); })
          .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });
      
      // Use d3.text and d3.csv.parseRows so that we do not need to have a header
      // row, and can receive the csv as an array of arrays.
      d3.text("visit-sequences.csv", function(text) {
        var csv = d3.csv.parseRows(text);
        var json = buildHierarchy(csv);
        createVisualization(json);
      });

    return {

      renderValue: function(obj) {

          d3.json(obj.src, function(error, root) {

              node = root;
              var path = svg.datum(root).selectAll("path")
                  .data(partition.nodes)
                  .enter().append("path")
                  .attr("d", arc)
                  .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
                  .on("click", click)
                  .each(stash);

              d3.selectAll("input").on("change", function change() {
                var value = this.value === "count"
                    ? function() { return 1; }
                    : function(d) { return d.size; };

                path
                    .data(partition.value(value).nodes)
                  .transition()
                    .duration(1000)
                    .attrTween("d", arcTweenData);
              });

              function click(d) {
                node = d;
                path.transition()
                  .duration(1000)
                  .attrTween("d", arcTweenZoom(d));
              }
            });

            d3.select(self.frameElement).style("height", height + "px");

            // Setup for switching data: stash the old values for transition.
            function stash(d) {
              d.x0 = d.x;
              d.dx0 = d.dx;
            }

            // When switching data: interpolate the arcs in data space.
            function arcTweenData(a, i) {
              var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
              function tween(t) {
                var b = oi(t);
                a.x0 = b.x;
                a.dx0 = b.dx;
                return arc(b);
              }
              if (i === 0) {
               // If we are on the first arc, adjust the x domain to match the root node
               // at the current zoom level. (We only need to do this once.)
                var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
                return function(t) {
                  x.domain(xd(t));
                  return tween(t);
                };
              } else {
                return tween;
              }
            }

            // When zooming: interpolate the scales.
            function arcTweenZoom(d) {
              var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                  yd = d3.interpolate(y.domain(), [d.y, 1]),
                  yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
              return function(d, i) {
                return i
                    ? function(t) { return arc(d); }
                    : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
              };
            }

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
