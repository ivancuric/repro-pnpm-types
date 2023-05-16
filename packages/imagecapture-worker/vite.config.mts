import { resolve } from "node:path";
import { defineConfig } from "vite";
import "zx/globals";

export default defineConfig((env) => {
  return {
    build: {
      minify: false,
      sourcemap: true,
      lib: {
        entry: {
          imagecapture: resolve(__dirname, "./src/worker.ts"),
        },
        name: "ImageCaptureWorker",
        fileName: () => "imagecapture-worker.js",
        formats: ["iife"],
      },
    },
  };
});
