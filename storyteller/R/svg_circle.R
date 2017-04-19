
#' @export
svg_circle <- function(jsplot, data = NULL, x = c(), y = c(), r = 1, legend = TRUE, axis = TRUE) {
   
   # error handling
   if (class(jsplot) != "jsplot") {
      stop("Doesn't know how to deal with non-jsplot object")
   }
   
   if (length(x) == 0 && length(y) == 0) {
      stop("Must specify variable for svg_circle to generate plot")
   }
   
   if (!contains(jsplot, x) || !contains(jsplot, y)) {
      stop("jsplot does not contain variables intended to plot")
   }
   
   # create a plot object
   point_plot <- structure(list(
      x = x,
      y = y,
      r = r,
      animations = list(),
      aes = "circle",
      axis = axis
   ), class = c("svg_element"))
   
   # add newly created plot to jsplot
   index <- length(jsplot[["layers"]])
   jsplot[["layers"]][[index+1]] <- point_plot
   jsplot
}


