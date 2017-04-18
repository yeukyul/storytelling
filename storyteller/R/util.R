# util.R - contains common functions needed to perform simple array operation such as 
# containment checking.

# contains check if the data frame contained in jsplot
# contains all the column specified in names
contains <- function(jsplot, names) {
   
   # error handling
   if (class(jsplot) != "jsplot") {
      stop("Doesn't know how to deal with non-jsplot object")
   }
   
   # extract column names of the contained dataset
   data <- jsplot[["data"]]
   var.names <- colnames(data)
   
   # iterate through vector for checking
   for (i in 1:length(names)) {
      if (!(names[i] %in% var.names)) {
         return(FALSE)
      }
   }
   return(TRUE)
}