import { getWrappedWorker } from "imagecapture-main";

void (async () => {
  const wrappedWorker = getWrappedWorker();

  const module = await wrappedWorker.loadWasmModule();

  await module.something();
})();
