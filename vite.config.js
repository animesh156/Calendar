import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from 'url';
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src") },
      { find: "@", replacement: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src") }
    ],
  },
});