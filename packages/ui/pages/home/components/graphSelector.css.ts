import { style, styleVariants } from "@vanilla-extract/css"

const itemBaseStyle = style({
  backgroundColor: "lightgray",
  borderRadius: "50%",
  cursor: "pointer",
  display: "block",
  height: "32px",
  width: "32px",
})

const selectedItemStyle = style({
  backgroundColor: "darkgray",
})

export const graphSelectorItemStyle = styleVariants({
  default: [itemBaseStyle],
  selected: [itemBaseStyle, selectedItemStyle],
})

export const graphSelectorContainerStyle = style({
  overflowY: "scroll",
})
