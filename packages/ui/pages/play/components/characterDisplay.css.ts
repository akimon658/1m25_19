import { style } from "@vanilla-extract/css"

export const characterDisplayStyle = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
})
