import { style } from "@vanilla-extract/css"

export const graphInfoPanelStyle = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: "16px",
  textAlign: "center",
})

export const graphRendererWrapperStyle = style({
  flex: "1 1 auto",
  display: "grid",
  placeItems: "center",
})

export const unknownGraphPreviewStyle = style({
  fontSize: "10rem",
  textAlign: "center",
  color: "#e0e0e0",
})

export const statsContainerStyle = style({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "stretch",
  padding: "16px 0",
  gap: "16px",
})

export const statItemStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  justifyContent: "center",
  alignItems: "center",
})

export const statLabelStyle = style({
  fontSize: "0.9rem",
  color: "#888",
  fontWeight: "500",
})

export const statValueStyle = style({
  fontSize: "1.4rem",
  fontWeight: "bold",
})

export const perfectTextStyle = style({
  color: "gold",
  textShadow: "0 0 4px rgba(255, 215, 0, 0.7)",
})

export const imperfectTextStyle = style({
  color: "#ccc",
})
