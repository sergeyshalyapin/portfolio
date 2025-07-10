When we talk of event loop
- No script tags
- No user interactions
- No DOM Manipulation

interaction functions:
- Timeouts
- XHR requessts
- Send and Recieve post messages (communicate with browser window)
- Promises

✅ Web Workers are JavaScript scripts that run in a separate thread from the main browser thread.

This means:

They don’t share the main thread’s event loop.

Each worker has its own event loop.

🟢 How It Works
Inside a Web Worker:

You have a simpler event loop.

The loop handles:

Messages (onmessage)

Timers (setTimeout, setInterval)

Fetch / async I/O

Promises/microtasks

✅ No access to the DOM

Workers cannot manipulate the document.

Communication with the main thread is only via postMessage() and onmessage.

🟢 Example Flow
Worker script loads.

Event loop starts.

It waits for:

Messages from the main thread.

Timers.

Other events (e.g., fetch completion).

Like the main thread, the worker:

Runs one macrotask at a time.

Runs all microtasks (Promise callbacks) after each macrotask.

✅ Example Worker Script:

```
// worker.js

console.log('Worker started');

onmessage = (event) => {
  console.log('Message received in worker:', event.data);

  setTimeout(() => {
    console.log('Timeout in worker');
    postMessage('Done');
  }, 0);

  Promise.resolve().then(() => {
    console.log('Promise resolved in worker');
  });
};
```

What happens if you send a message to this worker?

✅ Output:

```
Worker started
Message received in worker: <your data>
Promise resolved in worker
Timeout in worker
```
Why this order?

onmessage handler = macrotask.

Inside it, Promise schedules microtask.

setTimeout schedules macrotask.

Microtasks always run before the next macrotask.

🟢 Key Differences vs. Main Thread
Main Thread	Web Worker
Can access DOM	Cannot access DOM
Shares event loop with UI events	Separate event loop
Can block rendering	Does not block rendering
window object available	self refers to worker scope

✅ Summary:
Web Worker event loop = independent event loop that processes messages, timers, I/O, and microtasks (Promises) without blocking the main UI thread.