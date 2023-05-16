import { resolve } from "node:path";
import { defineConfig } from "vite";
import { linkResources, getPackagePath } from "@mb/utils";
import { fs } from "zx";
import { dependencies } from "./package.json";

export default defineConfig({
  build: {
    minify: false,
    // use inline source maps for inlined web worker
    sourcemap: "inline",
    target: "esnext",
    lib: {
      entry: {
        imagecapture: resolve(__dirname, "./src/index.ts"),
      },
      name: "ImageCapture",
      fileName: (format, name) => `${name}.${format}.js`,
    },
  },
  plugins: [
    {
      name: "move-resources",
      buildStart: async () => {
        if (ranOnce) {
          return;
        }
        moveDist("imagecapture-wasm");
        moveDist("imagecapture-worker");
        ranOnce = true;
      },
    },
  ],
});

let ranOnce = false;

type Dependency = keyof typeof dependencies;

async function moveDist(path: Dependency) {
  const pkgPath = getPackagePath(path);
  const distPath = `${pkgPath}/dist`;
  const files = fs.readdirSync(distPath);

  fs.ensureDirSync(`public/resources`);

  for (const path of files) {
    await linkResources(`${distPath}/${path}`, `public/resources/${path}`);
  }
}
