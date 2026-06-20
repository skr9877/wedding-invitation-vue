import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import svgLoader from "vite-svg-loader"
import fs from "fs"

import pkg from "./package.json"
import { createHtmlPlugin } from "vite-plugin-html"
import {
  GROOM_FULLNAME,
  BRIDE_FULLNAME,
  WEDDING_DATE,
  LOCATION,
  WEDDING_DATE_FORMAT,
} from "./src/const"

const distFolder = "build"

let base = "/"

try {
  const url = new URL(pkg.homepage)
  base = url.pathname
} catch (e) {
  base = pkg.homepage || "/"
}

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    createHtmlPlugin({
      inject: {
        data: {
          GROOM_FULLNAME,
          BRIDE_FULLNAME,
          DESCRIPTION: `${WEDDING_DATE.format(WEDDING_DATE_FORMAT)} ${LOCATION}`,
        },
      },
    }),
    {
      name: "manifest-inject",
      writeBundle() {
        const content = fs.readFileSync("public/manifest.json", "utf-8")
        const processed = content
          .replace(/<%= GROOM_FULLNAME %>/g, GROOM_FULLNAME)
          .replace(/<%= BRIDE_FULLNAME %>/g, BRIDE_FULLNAME)
        fs.writeFileSync(`${distFolder}/manifest.json`, processed)
      },
    },
  ],
  server: { port: 3000 },
  build: { outDir: distFolder },
  base,
})
