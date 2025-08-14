import { style, styleVariants } from "@vanilla-extract/css"

const baseStyle = style({
  border: "1px solid black",
  borderRadius: "50%",
  height: "32px",
  textAlign: "center",
  width: "32px",
})

const clickableStyle = style({
  boxShadow: "0 0 12px 2px lightgreen",
  transition: "box-shadow 0.2s ease",
})

const selectedStyle = style({
  backgroundColor: "lightblue",
})

const unselectedStyle = style({
  backgroundColor: "white",
})

export const customNodeStyle = styleVariants({
  clickableSelected: [baseStyle, selectedStyle, clickableStyle],
  clickableUnselected: [baseStyle, unselectedStyle, clickableStyle],
  unclickableSelected: [baseStyle, selectedStyle],
  unclickableUnselected: [baseStyle, unselectedStyle],
})
