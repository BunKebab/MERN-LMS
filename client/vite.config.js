import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://lms-ric-server.vercel.app:5000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
