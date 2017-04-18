'use strict';

HTMLWidgets.widget({

  name: 'render',

  type: 'output',

  factory: function(el, width, height) {

    var margin = Math.min(width, height) * 0.1;
    var svg = d3.select(el)
             .append("svg")
             .attr('width', width)
             .attr('height', height)
             .append("g")
             .attr("transform", "translate(" + margin + "," + margin + ")");

    return {

      renderValue: function(x) {
         var data = HTMLWidgets.dataframeToD3(x.data);
         console.log(data);
         console.log(x.layers);
         console.log(x.theme);
         console.log(x.animations);
         
         // iterate through all layers specified in the jsplot object
         for (var i = 0; i < x.layers.length; i++) {
            var thisLayer = x.layers[i];
            if (thisLayer.aes == "circle") {
               renderScatterPlot(el, data, thisLayer);
            }
         }
         
         // scatter plot renderer
         function renderScatterPlot(el, data, layer) {

            var x_var = layer.x;
            var y_var = layer.y;
            
            var x = d3.scale.linear()
               .range([ 0, width - margin*2 ]);
            
            var y = d3.scale.linear()
               .range([ height - margin*2, 0 ]);
               
            var color = d3.scale.category10();
            var xAxis = d3.svg.axis()
                            .scale(x)
                            .orient("bottom");
                        
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");
            
            x.domain(d3.extent(data, function(d) { return d[x_var]; })).nice();
            y.domain(d3.extent(data, function(d) { return d[y_var]; })).nice();
            
            svg.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + (height - margin*2) + ")")
               .call(xAxis)
             .append("text")
               .attr("class", "label")
               .attr("x", (width - margin))
               .attr("y", -6)
               .style("text-anchor", "end")
               .text("Sepal Width (cm)");
         
           svg.append("g")
               .attr("class", "y axis")
               .call(yAxis)
             .append("text")
               .attr("class", "label")
               .attr("transform", "rotate(-90)")
               .attr("y", 6)
               .attr("dy", ".71em")
               .style("text-anchor", "end")
               .text("Sepal Length (cm)")
         
           svg.selectAll(".dot")
               .data(data)
               .enter().append("circle")
               .attr("class", "dot")
               .attr("r", 3.5)
               .attr("cx", function(d) { return x(d[x_var]); })
               .attr("cy", function(d) { return y(d[y_var]); });
         
           var legend = svg.selectAll(".legend")
               .data(color.domain())
               .enter().append("g")
               .attr("class", "legend")
               .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
         
           legend.append("rect")
               .attr("x", width - 18)
               .attr("width", 18)
               .attr("height", 18)
               .style("fill", "lightgrey");
         
           legend.append("text")
               .attr("x", width - 24)
               .attr("y", 9)
               .attr("dy", ".35em")
               .style("text-anchor", "end")
               .text(function(d) { return d; });          
            
         }
         
         // line plot renderer
         function renderLinePlot(el, data, layer) {
            
         }
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});