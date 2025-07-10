const worker1 = new Worker("worker1.js");
const worker2 = new Worker("worker2.js");

worker1.onmessage = (event) => {
  console.log('Worker1 returned', event.data);
};

worker2.onmessage = (event) => {
  console.log('Worker2 returned', event.data);
};

worker1.postMessage(2);             // Should be doubled
worker2.postMessage(3);             // Should be trippled
