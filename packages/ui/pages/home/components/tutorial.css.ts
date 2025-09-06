import { style } from "@vanilla-extract/css"

export const tutorialWrapperStyle = style({
  width: "100dvw",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "20px",
  boxSizing: "border-box",
  position: "relative",
  cursor: "pointer",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
})

export const characterImageStyle = style({
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translateX(-50%)",
  height: "90dvh",
  objectFit: "contain",
  pointerEvents: "none", // 画像がクリックイベントを妨げないようにする
})

export const textBoxStyle = style({
  position: "relative",
  zIndex: 1,
  width: "90%",
  maxWidth: "800px",
  minHeight: "150px",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "white",
  padding: "1.5rem",
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
})
