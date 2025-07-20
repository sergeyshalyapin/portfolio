- No script parsing events
- No user interactions
- No animation frame callbacks
- No rendering pipeline

Node has 3 intersting queues
- XHR requests
- descrets
- callbacks

And additional
- microtasks (promises)
- ticks queue / process.nextTick(callback) 

Schema:
```
while (tasksAreWaiting()) {
  queue = getNextQueue();

  while (queue.hasTasks()) {
    task = queue.pop();
    execute(task);

    while (nextTickQueue.hasTasks())
      doNextTickTask();

    while (promiseQueue.hasTasks())
      doPromiseTask();
  }
}
```


✅ Node.js event loop is the mechanism that allows Node to handle many operations (like I/O) without blocking the main thread, using a single-threaded, non-blocking architecture.

🟢 How It Works
The event loop processes different phases in order. Each phase has a queue of callbacks:

Timers

Executes callbacks scheduled by setTimeout() and setInterval() whose time has expired.

Pending Callbacks

Executes I/O callbacks deferred to the next loop iteration.

Idle, Prepare (internal use)

Poll

Retrieves new I/O events (like reading files, sockets).

Executes their callbacks if ready.

If no timers are scheduled, it may block here waiting for I/O.

Check

Executes callbacks scheduled by setImmediate().

Close Callbacks

E.g., socket.on('close', ...)

✅ Microtasks (process.nextTick and Promises)

After every phase, Node processes all microtasks before moving to the next phase.

process.nextTick() callbacks have even higher priority than Promises.

🟢 Example Timeline
Here’s an example script:

javascript
Copy
Edit
console.log('start');

setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

Promise.resolve().then(() => {
  console.log('promise');
});

process.nextTick(() => {
  console.log('nextTick');
});

console.log('end');
✅ Output order:

pgsql
Copy
Edit
start
end
nextTick
promise
timeout
immediate
Why?

Main script runs (start, end).

process.nextTick() runs before any other microtask.

Promise microtask runs.

setTimeout callback runs in Timers phase.

setImmediate callback runs in Check phase.

🟢 Quick Summary
Node.js event loop = engine running your callbacks in phases.

Microtasks: process.nextTick() (highest priority), Promises.

Timers: setTimeout(), setInterval().

setImmediate(): Runs after Poll phase.

Poll phase: Waits for incoming I/O events.

Single-threaded JS, but uses libuv to handle I/O in background threads.