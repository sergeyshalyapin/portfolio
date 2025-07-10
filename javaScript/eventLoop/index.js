console.log("Start");

requestAnimationFrame(() => {
  console.log("AnimationFrame at the start");
});

setTimeout(() => {
  console.log("Timeout"); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log("Promise"); // Microtask
});

requestAnimationFrame(() => {
  console.log("AnimationFrame at the end");
});

console.log("End");