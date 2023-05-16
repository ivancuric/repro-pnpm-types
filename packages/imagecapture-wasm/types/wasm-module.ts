// MAIN TYPE OF THE WASM
export type ImageCaptureWasmModule = ImageCaptureBindings & EmscriptenModule;

export type ImageCaptureBindings = {
  something: () => void;
};
