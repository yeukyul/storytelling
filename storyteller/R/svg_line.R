
#' @export
svg_line <- function(jsplot, data = NULL, x = c(), y = c(), r = 1, legend = TRUE, axis = TRUE) {
   
   # error handling
   if (class(jsplot) != "jsplot") {
      stop("Doesn't know how to deal with non-jsplot object")
   }
   
   if (length(x) == 0 && length(y) == 0) {
      stop("Must specify variable for svg_line to generate plot")
   }
   
   if (!is.null(data) 
       && (!all((x %in% colnames(data)))
       || !all((y %in% colnames(data))))) {
      stop("data does not contain variables intended to plot")
   }
   else if (!contains(jsplot, x) || !contains(jsplot, y)) {
      stop("jsplot does not contain variables intended to plot")
   }
   
   # create a plot object
   line_plot <- structure(list(
      x = x,
      y = y,
      animations = list(),
      aes = "line",
      axis = axis
   ), class = c("svg_element"))
   
   # add newly created plot to jsplot
   index <- length(jsplot[["layers"]])
   jsplot[["layers"]][[index+1]] <- line_plot
   jsplot
}


