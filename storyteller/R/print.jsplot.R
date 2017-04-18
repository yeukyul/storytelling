
# print.jsplot customize the printing of jsplot
#' @export
plot.jsplot <- function(plot) {
   paste("jsplot with ", 
         length(plot[["layers"]]), " layers and ", 
         length(plot[["animations"]]), " scheduled animations", 
         sep = "")
}
