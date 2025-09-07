import { style } from "@vanilla-extract/css"

export const homeLayout = style({
  display: "flex",
  height: "100dvh",
  boxSizing: "border-box",
})

export const graphSelectorWrapper = style({
  flex: "0 0 320px",
  overflowY: "auto",
  position: "relative",
  "::after": {
    content: '""',
    position: "absolute",
    top: "20px",
    bottom: "20px",
    right: 0,
    width: "1px",
    background: "rgba(255, 255, 255, 0.1)",
  },
})

export const graphInfoPanelWrapper = style({
  flex: "1 1 auto",
  overflowY: "auto",
})

export const creditIconStyle = style({
  position: "fixed",
  bottom: "1rem",
  left: "1rem",
  color: "rgba(255, 255, 255, 0.7)",
  cursor: "pointer",
  zIndex: 1000,
  transition: "color 0.2s ease",

  ":hover": {
    color: "white",
  },
})
