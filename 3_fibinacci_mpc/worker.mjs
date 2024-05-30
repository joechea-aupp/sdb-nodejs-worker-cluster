import { parentPort } from "worker_threads";

parentPort.once("message", (message) => {
  const sharedArray = message.data;
  const index = message.index;

  const arrValue = Atomics.load(sharedArray, index);
  const fibonnaciValue = calculateFibonacci(arrValue);
  parentPort.postMessage(fibonnaciValue);
});

const calculateFibonacci = (num) => {
  let a = 1,
    b = 0,
    temp;

  while (num >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
};
