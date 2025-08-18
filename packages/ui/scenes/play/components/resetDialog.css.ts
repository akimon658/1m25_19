import { style } from "@vanilla-extract/css"

export const dialogContentStyle = style({
  backdropFilter: "blur(10px)",
  color: "white",
  left: "50%",
  padding: "24px",
  position: "fixed",
  top: "50%",
  transform: "translate(-50%, -50%)",
})
