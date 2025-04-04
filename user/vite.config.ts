import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "user",
      filename: "remoteEntry.js",
      exposes: {
        "./UserComp": "./src/UserComp",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "@apollo/client",
        "graphql",
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
