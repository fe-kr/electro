import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    outDir: "dist-react",
  },
  plugins: [
    react(),
    tailwindcss(),
    electron({
      main: {
        entry: "src/app/main.ts",
      },
      preload: {
        input: "src/app/preload.ts",
      },
    }),
  ],
});
