
#
# layer_check - check if given argument suffices to constitute a layer in svg graphic
#
# Specificially: - check for if x and y are zero length
#                - check if data intending to plot contains x, y variables
#
layer_check <- function(jsplot, x, y, data = NULL) {
   
   if (length(x) == 0 && length(y) == 0) {
      stop("Must specify variable for svg_line to generate plot")
   }
   
   if (!contains(jsplot, x) || !contains(jsplot, y)) {
      stop("jsplot does not contain variables intended to plot")
   }
}

# is_jsplot - check if given argument is a jsplot object
is_jsplot <- function(jsplot, function_name) {
   if (class(jsplot) != "jsplot") {
      stop(paste(function_name, "doesn't know how to deal with non-jsplot object"))
   }
}

#
# render_pre checks if precondition for `render` is satisified
#' Specificially: - check if jsplot contains layer
#                 - check if all layer has speicifed data
#
render_precondition <- function(jsplot) {
   
}