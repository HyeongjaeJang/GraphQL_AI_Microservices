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
        "./PostComp": "./src/PostComp",
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
