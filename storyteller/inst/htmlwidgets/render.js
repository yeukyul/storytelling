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

      renderValue: function(obj) {
      
         var data = HTMLWidgets.dataframeToD3(obj.data);
         var x = d3.scale.linear()
               .range([ 0, width - margin*2 ]);
            
         var y = d3.scale.linear()
            .range([ height - margin*2, 0 ]);
         
         // iterate through all layers specified in the jsplot object
         for (var i = 0; i < obj.layers.length; i++) {
            var thisLayer = obj.layers[i];
            if (thisLayer.aes == "circle") {
               renderScatterPlot(el, data, thisLayer);
            }
            if (thisLayer.aes == "line") {
               renderLinePlot(el, data, thisLayer);
            }
         }
         
         // scatter plot renderer
         function renderScatterPlot(el, data, layer) {

            var x_var = layer.x;
            var y_var = layer.y;
            
            x.domain(d3.extent(data, function(d) { return d[x_var]; })).nice();
            y.domain(d3.extent(data, function(d) { return d[y_var]; })).nice();
         
           svg.selectAll(".dot")
               .data(data)
               .enter().append("circle")
               .attr("class", "dot")
               .attr("cx", function(d) { return x(d[x_var]); })
               .attr("cy", function(d) { return y(d[y_var]); })
               .attr("r", 0)
               .transition(200)
               .attr("r", 3.5)
               .attr("stroke", "#BE817F")
               .attr("fill", "#BE817F");
            
            if (layer.axis) {
               addAxis(el, data, layer);
            }
         }
         
         function addAxis(el, data, layer) {
            
            var x_var = layer.x;
            var y_var = layer.y;
            
            x.domain(d3.extent(data, function(d) { return d[x_var]; })).nice();
            y.domain(d3.extent(data, function(d) { return d[y_var]; })).nice();
            
            var xAxis = d3.svg.axis()
                           .scale(x)
                           .orient("bottom");
                        
            var yAxis = d3.svg.axis()
                           .scale(y)
                           .orient("left");
                           
            svg.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + (height - margin*2) + ")")
               .call(xAxis)
             .append("text")
               .attr("class", "label")
               .attr("x", (width - margin))
               .attr("y", -6)
               .style("text-anchor", "end")
               .text("");
            
            svg.append("g")
               .attr("class", "y axis")
               .call(yAxis)
             .append("text")
               .attr("class", "label")
               .attr("transform", "rotate(-90)")
               .attr("y", 6)
               .attr("dy", ".71em")
               .style("text-anchor", "end")
               .text("");
         }
         
         // line plot renderer
         function renderLinePlot(el, data, layer) {
            
            var x_var = layer.x;
            var y_var = layer.y;
            
            // Define the line
            var valueline = d3.svg.line()
            	.x(function(d) { return x(d[x_var]); })
            	.y(function(d) { return y(d[y_var]); });
             
         	// Scale the range of the data
         	x.domain(d3.extent(data, function(d) { return d[x_var]; }));
         	y.domain([0, d3.max(data, function(d) { return d[y_var]; })]);
          
         	// Add the valueline path.
         	svg.append("path")	
         		.attr("class", "line")
         		.attr("d", valueline(data))
         		.attr("fill", "lightgrey")
         		.attr("stroke", "lightgrey");
         		
         	if (layer.axis) {
         	   addAxis(el, data, layer);
         	}
          }
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});