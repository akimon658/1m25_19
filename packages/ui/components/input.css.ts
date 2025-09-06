import { style } from "@vanilla-extract/css"

export const inputStyle = style({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "0.5rem",
  color: "white",
  padding: "0.75rem 1rem",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  fontFamily: "inherit",
  fontSize: "1rem",

  "::placeholder": {
    color: "rgba(255, 255, 255, 0.5)",
  },

  ":focus": {
    outline: "none",
    borderColor: "rgba(0, 191, 255, 0.8)",
    boxShadow: "0 0 0 2px rgba(0, 191, 255, 0.4)",
  },
})
