import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { viteWebfontDownload } from "vite-plugin-webfont-dl"

export default defineConfig(() => ({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    viteWebfontDownload(),
  ],
}))
