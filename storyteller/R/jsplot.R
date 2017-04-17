
#' jsplot - a class that contains information necessary to render
#'     a base plot in javascript.
#' @param data data frame that contains the dataset wish to be plotted. Defaults to NULL.
#' @return A jsplot object that represents a base plot to the dataset 
#'         originally passed in as an argument.
#' @export
jsplot <- function(data, mapping = aes(), ...,
                   environment = parent.frame()) {
   UseMethod("jsplot")
}


#' @export
jsplot.default <- function(data, mapping = aes(), ...,
                           environment = parent.frame()) {
   stop("jsplot doesn't know how to deal with type of data that is not a data frame")
}

#' @export
jsplot.data.frame <- function(data, mapping = aes(), ...,
                              environment = parent.frame()) {
   
   p <- structure(list(
      data = data,
      layers = list(),
      mapping = mapping,
      theme = list(),
      animations = list(),
      plot_env = environment
   ), class = c("jsplot"))
   
   p
}
