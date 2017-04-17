# jsplot - a class that contains information necessary to render
#     a base plot in javascript.
#' @export
jsplot <- function(data, x, y, ...) {
   new("jsplot", data = data, x = x, y = y, ...)
}
