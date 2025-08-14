import { style, styleVariants } from "@vanilla-extract/css"

const nodeStyleBase = style({
  border: "1px solid black",
  borderRadius: "50%",
  height: "32px",
  textAlign: "center",
  width: "32px",
})

export const customNodeStyle = styleVariants({
  default: [nodeStyleBase, {
    backgroundColor: "white",
  }],
  selected: [nodeStyleBase, {
    backgroundColor: "lightblue",
  }],
})
