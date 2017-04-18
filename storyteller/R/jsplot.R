
#' jsplot - a class that contains information necessary to render
#'     a base plot in javascript.
#' @param data data frame that contains the dataset wish to be plotted. Defaults to NULL.
#' @return A jsplot object that represents a base plot to the dataset 
#'         originally passed in as an argument.
#' @export
jsplot <- function(data, ...,
                   environment = parent.frame()) {
   UseMethod("jsplot")
}

#' jsplot.default - error handling for creation of jsplot for non-dataframe type of object
#'
#' @export
jsplot.default <- function(data, ...,
                           environment = parent.frame()) {
   stop("jsplot doesn't know how to deal with type of data that is not a data frame")
}

#' @export
jsplot.data.frame <- function(data, ...,
                              environment = parent.frame()) {
   
   p <- structure(list(
      data = data,
      layers = list(),
      theme = list(),
      animations = list(),
      plot_env = environment
   ), class = c("jsplot"))
   
   p
}
