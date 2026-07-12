import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // listen on the LAN interface too, so phones/tablets on the same WiFi can connect
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
