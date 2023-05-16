import { wrap } from "comlink";
import type { RemoteObj } from "imagecapture-worker";

// https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
// import type {} from "imagecapture-wasm";
// import type {} from "imagecapture-worker";

export const getWrappedWorker = () => {
  const worker = new Worker(new URL("fakeWorkerUrl", window.location.href));

  const wrappedWorker = wrap<RemoteObj>(worker);

  wrappedWorker.loadWasmModule;

  return wrappedWorker;
};
