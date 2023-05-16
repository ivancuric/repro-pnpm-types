import dns from "dns";
import { ServerOptions, defineConfig } from "vite";
import FullReload from "vite-plugin-full-reload";
import mkcert from "vite-plugin-mkcert";
import solidPlugin from "vite-plugin-solid";
import { getPackagePath, linkResources } from "@mb/utils";
import { fs } from "zx";
import { dependencies } from "./package.json";

// https://vitejs.dev/guide/migration.html#architecture-changes-and-legacy-options
dns.setDefaultResultOrder("verbatim");

const serverOptions: ServerOptions = {
  port: 3000,
  https: true,
  headers: {
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin",
  },
  host: true,
};

export default defineConfig({
  plugins: [
    // FullReload(["public/**/*"]),
    {
      name: "move-resources",
      buildStart: async () => {
        if (ranOnce) {
          return;
        }
        moveDist("imagecapture-main");
        ranOnce = true;
      },
    },
    solidPlugin(),
    // Generates certificates for https
    mkcert(),
  ],
  server: serverOptions,
  preview: serverOptions,
});

let ranOnce = false;

type Dependency = keyof typeof dependencies;

async function moveDist(packagePath: Dependency) {
  const pkgPath = getPackagePath(packagePath);
  const resourcesPath = `${pkgPath}/dist/resources`;
  const files = fs.readdirSync(resourcesPath);

  fs.ensureDirSync(`public/resources`);

  for (const path of files) {
    await linkResources(`${resourcesPath}/${path}`, `public/resources/${path}`);
  }
}
