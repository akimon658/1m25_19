import { globalStyle } from "@vanilla-extract/css"
import background from "./assets/background.png"

globalStyle("html, body", {
  backgroundColor: "#19132F",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  color: "white",
  fontFamily: "Kiwi Maru, sans-serif",
  margin: 0,
  padding: 0,
})

globalStyle("button", {
  all: "unset",
})

globalStyle("p", {
  all: "unset",
  display: "block",
})

globalStyle("::-webkit-scrollbar", {
  width: "8px",
})

globalStyle("::-webkit-scrollbar-track", {
  background: "transparent",
})

globalStyle("::-webkit-scrollbar-thumb", {
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "4px",
})
