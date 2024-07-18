import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        advanced: resolve(__dirname, "src/weatheradv/index.html"),
      },
    },
  },

  server: {
    assetsInclude: ["src/json/**/*"],
  },
});
