import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import { extractFonts } from "./vite-plugins/extract-fonts"

export default defineConfig((config) => {
  const { command } = config
  return {
    plugins: [sveltekit(), extractFonts({ command, cacheDir: ".fonts" })],
  }
})
