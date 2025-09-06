import { style, styleVariants } from "@vanilla-extract/css"

const itemBaseStyle = style({
  borderRadius: "50%",
  cursor: "pointer",
  display: "block",
  height: "40px",
  width: "40px",
  border: "2px solid transparent",
  transition: "all 0.3s ease-in-out",
  position: "relative",
  marginBottom: "12px",
  ":hover": {
    transform: "scale(1.1)",
  },
})

const selectedStyle = style({
  borderColor: "white",
  boxShadow: "0 0 20px 4px rgba(255, 255, 255, 0.6)",
})

const unlockedStyle = style({
  backgroundColor: "lightgray",
  boxShadow: "0 0 8px 1px rgba(211, 211, 211, 0.7)",
})

const clearedStyle = style({
  backgroundColor: "lightgreen",
  background: "radial-gradient(circle, #e0ffe0, lightgreen)",
  boxShadow: "0 0 12px 2px rgba(144, 238, 144, 0.8)",
})

const perfectStyle = style({
  backgroundColor: "gold",
  background: "radial-gradient(circle, lightyellow, gold)",
  boxShadow: "0 0 20px 4px rgba(255, 215, 0, 1)",
})

export const graphSelectorItemStyle = styleVariants({
  unlockedUnselected: [itemBaseStyle, unlockedStyle],
  unlockedSelected: [itemBaseStyle, unlockedStyle, selectedStyle],
  clearedUnselected: [itemBaseStyle, clearedStyle],
  clearedSelected: [itemBaseStyle, clearedStyle, selectedStyle],
  perfectUnselected: [itemBaseStyle, perfectStyle],
  perfectSelected: [itemBaseStyle, perfectStyle, selectedStyle],
})

export const graphSelectorContainerStyle = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  overflowY: "scroll",
  height: "100%",
  gap: "8px",
})
