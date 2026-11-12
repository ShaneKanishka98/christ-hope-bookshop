import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  server: { port: 8080, host: true },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({ server: { entry: "server" } }),
    viteReact(),
    tailwindcss(),
    // Deploys to Cloudflare Workers (with static assets). Nitro writes the wrangler config for us.
    nitro({
      compatibilityDate: "2025-05-01",
      preset: "cloudflare_module",
      cloudflare: { deployConfig: true, nodeCompat: true, wrangler: { name: "christ-hope" } },
    }),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
});
