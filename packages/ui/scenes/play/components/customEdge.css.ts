import { style, styleVariants } from "@vanilla-extract/css"

const defaultEdgeStyle = style({
  stroke: "lightgray",
  strokeWidth: 1,
})

const selectedEdgeStyle = style({
  stroke: "lightblue",
  strokeWidth: 4,
})

export const customEdgeStyle = styleVariants({
  default: [defaultEdgeStyle],
  selected: [selectedEdgeStyle],
})
