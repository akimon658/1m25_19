import { keyframes, style, styleVariants } from "@vanilla-extract/css"

const baseStyle = style({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  border: "none",
  borderRadius: "0.5rem",
  cursor: "pointer",
  color: "white",
  padding: "0.5rem 1rem",
  textDecoration: "none",
  transition: "background-color 0.2s ease",

  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
})

const primaryDisabledStyle = style({
  backgroundColor: "rgba(120, 170, 200, 0.5)", // グレー寄りの青
  color: "#e0eaf3b6", // 文字色も淡い青
  cursor: "not-allowed",

  ":hover": {
    backgroundColor: "rgba(120, 170, 200, 0.5)", // hoverでも色を変えない
  },
})

const primaryStyle = style({
  backgroundColor: "rgba(0, 191, 255, 0.8)",

  ":hover": {
    backgroundColor: "rgb(0, 191, 255)",
  },
})

export const buttonStyle = styleVariants({
  default: [baseStyle],
  primary: [baseStyle, primaryStyle],
  primaryDisabled: [baseStyle, primaryDisabledStyle],
})

const spinKeyframes = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
})

export const loadingIconStyle = style({
  animation: `${spinKeyframes} 1s linear infinite`,
  height: "1rem",
})
