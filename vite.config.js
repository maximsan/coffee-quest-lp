import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "t-xsdefapg.tunn.dev",
      "imports-temperature-shopzilla-flashers.trycloudflare.com",
      "subsequently-roommate-vat-retrieved.trycloudflare.com",
    ],
  },
});
