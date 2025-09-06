import { style } from "@vanilla-extract/css"

export const graphInfoPanelStyle = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: "16px",
})

export const graphRendererWrapperStyle = style({
  flex: "1 1 auto",
})

export const unknownGraphPreviewStyle = style({
  fontSize: "10rem",
  textAlign: "center",
})
