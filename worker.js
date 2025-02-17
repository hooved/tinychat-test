const kernelsReady = (async () => {
  // can't get browser to use updated versions except with cache-busting query string
  const exports = await import(`./net_clang.js?version=${Date.now()}`);
  Object.assign(self, exports);
})();

async function initStateDict(event) {
  await kernelsReady;
  self.model = await self.transformer(event.data);
  self.addEventListener("message", loadStateDict);
  self.removeEventListener("message", initStateDict);
  self.postMessage(self.model.state_dict);
  delete self.model.state_dict;
}

function loadStateDict(event) {
  if (event.data === "done") {
    self.addEventListener("message", inference);
    self.removeEventListener("message", loadStateDict);
  }
  else {
    //self.postMessage("success");
    //return;
    const part = event.data;
    for (const [wasm_idx, wasm_offset] of part.wasm_offsets) {
      self.model.wasm[wasm_idx].HEAPU8.set(part.bytes, wasm_offset);
      /*
      if (part.isMobile) {
        pages_per_load = 10;
        //pages_per_pause = 10;
        for (let i=0; i<part.bytes.length; i += (pages_per_load * 65536)) { // wasm page size
          const end = Math.min(part.bytes.length, i + (pages_per_load * 65536))
          self.model.wasm[wasm_idx].HEAPU8.set(part.bytes.slice(i, i + end), wasm_offset + i);
          //if (i % (pages_per_pause * 65536) === 0) {await new Promise(resolve => setTimeout(resolve));}
        }
      }
      else {
        self.model.wasm[wasm_idx].HEAPU8.set(part.bytes, wasm_offset);
      }
        */
    }
  }
  self.postMessage("success");
}

function inference(event) {
  const [tok, start_pos] = event.data;
  const int32tok = new Int32Array([tok]);
  const uint8tok = new Uint8Array(int32tok.buffer);
  const uint8nextTok = self.model.run(uint8tok, start_pos)[0];
  const int32nextTok = new Int32Array(uint8nextTok.buffer);
  self.postMessage(int32nextTok[0]);
}

self.addEventListener('message', initStateDict);