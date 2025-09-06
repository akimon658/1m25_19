import { style } from "@vanilla-extract/css"

export const dialogContentStyle = style({
  backdropFilter: "blur(12px)",
  backgroundColor: "rgba(30, 30, 30, 0.7)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
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
