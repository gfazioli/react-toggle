import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  base: "/react-toggle/",
  plugins: [react()],
  resolve: {
    alias: {
      "react-toggle-component": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("../site-dist", import.meta.url)),
    emptyOutDir: true,
    sourcemap: true,
  },
});
