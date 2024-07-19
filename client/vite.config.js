import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://library.riphah.khanewal.vercel.app",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
