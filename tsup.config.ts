import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  external: ["react", "react-dom"],
  loader: {
    ".css": "local-css",
  },
  injectStyle: false,
});
