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

export const customHandleStyle = style({
  // To position the handle in the center
  // https://github.com/xyflow/xyflow/issues/2665
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  transform: "translate(-50%, -50%)",

  // To hide the handle
  // https://reactflow.dev/learn/customization/handles#hiding-handles
  visibility: "hidden",
})

const baseNodeStyle = style({
  borderRadius: "50%",
  height: "32px",
  width: "32px",
})

const clickableBaseStyle = style({
  boxShadow: "0 0 16px 2px lightgreen",
  cursor: "pointer",
  transition: "box-shadow 0.2s ease",
})

const clickableSelectedStyle = style({
  background: "radial-gradient(circle, white, lightgreen)",
})

const clickableUnselectedStyle = style({
  backgroundColor: "lightgreen",
})

const unclickableSelectedStyle = style({
  background: "radial-gradient(circle, white, lightblue)",
})

const unclickableUnselectedStyle = style({
  backgroundColor: "lightgray",
})

export const customNodeStyle = styleVariants({
  clickableSelected: [
    baseNodeStyle,
    clickableBaseStyle,
    clickableSelectedStyle,
  ],
  clickableUnselected: [
    baseNodeStyle,
    clickableBaseStyle,
    clickableUnselectedStyle,
  ],
  unclickableSelected: [baseNodeStyle, unclickableSelectedStyle],
  unclickableUnselected: [baseNodeStyle, unclickableUnselectedStyle],
})
