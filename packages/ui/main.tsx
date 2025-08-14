import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"
import "./global.css.ts"

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
