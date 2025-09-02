import { style, styleVariants } from "@vanilla-extract/css"

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

const primaryStyle = style({
  backgroundColor: "rgba(0, 191, 255, 0.8)",

  ":hover": {
    backgroundColor: "rgb(0, 191, 255)",
  },
})

export const buttonStyle = styleVariants({
  default: [baseStyle],
  primary: [baseStyle, primaryStyle],
})
