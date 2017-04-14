HTMLWidgets.widget({

  name: 'storyteller',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    var svg = d3.select("svg"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        el.innerText = x.message;

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});