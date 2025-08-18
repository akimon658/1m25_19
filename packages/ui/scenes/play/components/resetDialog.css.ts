import { style } from "@vanilla-extract/css"

export const dialogContentStyle = style({
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  borderRadius: "12px",
  left: "50%",
  padding: "24px",
  position: "fixed",
  top: "50%",
  transform: "translate(-50%, -50%)",
})

export const dialogControlStyle = style({
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  paddingTop: "24px",
})
