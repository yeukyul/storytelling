#' render - renders the jsplot object into html widget output
#'
#' render accepts a layered jsplot and render a svg plot with specified
#' layer using other jsfunctions.
#'
#' @import htmlwidgets
#'
#' @export
render <- function(jsplot, width = NULL, height = NULL, elementId = NULL) {

  if (class(jsplot) != "jsplot") {
     stop("render doesn't know how to deal with object that is not jsplot")
  }
   
  # forward jsplot object into html widget
  x = list(
    data = jsplot[["data"]],
    layers = jsplot[["layers"]],
    theme = jsplot[["theme"]],
    animations = jsplot[["animations"]],
    environment = jsplot[["plot_env"]],
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'render',
    x,
    width = width,
    height = height,
    package = 'storyteller',
    elementId = elementId
  )
}

#' Shiny bindings for render
#'
#' Output and render functions for using render within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a render
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name render-shiny
#'
#' @export
renderOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'render', width, height, package = 'storyteller')
}

#' @rdname render-shiny
#' @export
renderRender <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, renderOutput, env, quoted = TRUE)
}
