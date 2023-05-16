import { expose, proxy } from "comlink";
import type { ImageCaptureWasmModule } from "imagecapture-wasm";

declare global {
  interface WorkerGlobalScope {
    createModule: EmscriptenModuleFactory<ImageCaptureWasmModule>;
  }
}

const loadWasmModule = async () => {
  importScripts(new URL("fake", self.location.origin));

  /**
   * https://emscripten.org/docs/api_reference/module.html#module-object
   */
  const wasmModule = await self.createModule({
    locateFile: (path: string) => {
      return self.location.origin + "/fake/" + path;
    },
  });

  wasmModule.something();

  return proxy(wasmModule);
};

export const exportedApi = {
  loadWasmModule,
};

expose(exportedApi);

export type RemoteObj = typeof exportedApi;
