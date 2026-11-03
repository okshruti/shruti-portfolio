// Lovable supplies the base TanStack Start, React, Tailwind, and path-alias plugins.
// Netlify's official Vite plugin adds the Netlify-compatible server/functions output.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  vite: {
    plugins: [netlify()],
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
