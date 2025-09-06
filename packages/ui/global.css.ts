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
