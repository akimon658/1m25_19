import { style } from "@vanilla-extract/css"

export const homeLayout = style({
  display: "flex",
  height: "100dvh",
  boxSizing: "border-box",
})

export const graphSelectorWrapper = style({
  flex: "0 0 320px",
  overflowY: "auto",
})

export const graphInfoPanelWrapper = style({
  flex: "1 1 auto",
  overflowY: "auto",
})
