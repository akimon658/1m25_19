import { style, styleVariants } from "@vanilla-extract/css"

const baseStyle = style({
  borderRadius: "50%",
  height: "32px",
  width: "32px",
})

const clickableBaseStyle = style({
  boxShadow: "0 0 16px 2px lightgreen",
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
    baseStyle,
    clickableBaseStyle,
    clickableSelectedStyle,
  ],
  clickableUnselected: [
    baseStyle,
    clickableBaseStyle,
    clickableUnselectedStyle,
  ],
  unclickableSelected: [baseStyle, unclickableSelectedStyle],
  unclickableUnselected: [baseStyle, unclickableUnselectedStyle],
})
