import { style } from "@vanilla-extract/css"

export const tutorialWrapperStyle = style({
  width: "100dvw",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
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

export const characterImageStyleForPlay = style({
  position: "absolute",
  bottom: 0,
  right: "5%", // 右から5%の位置に配置
  height: "85dvh", // 少し小さくする
  objectFit: "contain",
  pointerEvents: "none",
})

export const textBoxStyle = style({
  position: "relative",
  zIndex: 1,
  width: "90%",
  maxWidth: "800px",
  backdropFilter: "blur(12px)",
  backgroundColor: "rgba(30, 30, 30, 0.7)",
  marginBottom: "20px",
  color: "white",
  padding: "1.5rem",
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
})

export const nameConfirmButtons = style({
  display: "flex",
  gap: "0.75rem",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "0.5rem",
  width: "100%",
})
