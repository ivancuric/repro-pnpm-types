import { getWrappedWorker } from "imagecapture-main";

(async () => {
  const wrappedWorker = getWrappedWorker();

  const module = await wrappedWorker.loadWasmModule();

  module.something();
})();
