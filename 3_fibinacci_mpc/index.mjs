import { Worker } from "worker_threads";

const runFibonnaci = (nums) => {
  let length = nums.length;
  let size = Int32Array.BYTES_PER_ELEMENT * length;

  let sharedBuffer = new SharedArrayBuffer(size);
  let sharedArray = new Int32Array(sharedBuffer);

  nums.forEach((num, index) => {
    Atomics.store(sharedArray, index, num);
    let worker = new Worker("./worker.mjs");

    worker.once("message", (message) => {
      console.log(message);
    });

    worker.postMessage({ data: sharedArray, index });
  });
};

runFibonnaci([50, 20, 21, 24, 4]);
