### JavaScript is a single-hreaded non-blocking asynchronous concurrent language.
<br>

#### 🧵 Single-threaded
- There is one main thread of execution, i.e., only one thing can be executing JavaScript code at a time.
- The JavaScript engine (like V8 in Chrome or Node.js) processes instructions sequentially.
- It does NOT run multiple JavaScript instructions simultaneously in different threads (like Java or C# might with multithreading).
- This avoids problems like race conditions and complicated locking.

```
console.log("First");
console.log("Second");
```
Will always log:
```
First
Second
```
<br>

#### 🛑 Non-blocking
- Non-blocking refers to how JavaScript handles operations that take time (like reading a file or making a network request).
- Instead of waiting for the operation to finish and blocking further code, it initiates the operation and immediately moves on.
- When the operation is done, JavaScript is notified (via callbacks, promises, or async/await).

```
fs.readFile("file.txt", () => {
  console.log("File read!");
});
console.log("Next line runs immediately.");
```
<br>

#### ⏳ Asynchronous
- Certain operations happen in the background.
- They complete later.
- You provide a way to be notified when they are done, e.g., callbacks, promises.
- Async is what makes non-blocking possible.

```
setTimeout(() => {
  console.log("Done waiting!");
}, 1000);

console.log("This runs first.");
```
You see:
```
This runs first.
Done waiting!
```
<br>

#### ⚙️ Concurrent
- The JavaScript environment can manage multiple operations in progress (e.g., timers, I/O) at the same time.
- Even though the JavaScript code is single-threaded, the environment (Node.js runtime or the browser) has other threads (e.g., in the OS) doing the background work.
- So multiple things can progress concurrently, but your code is still executed one thing at a time on the main thread.
- This is why you can start a network request and while you wait, your code continues running.

Example:
While your script is waiting for I/O, you can still respond to user input or process other callbacks.
<br>

### 🧩 Key Parts of JavaScript Execution
You can think of the JavaScript runtime as having several main components that work together:

#### 1️⃣ Call Stack
What it is:
A stack data structure that keeps track of what functions are currently running.

How it works:
When you call a function, it’s pushed onto the stack.
When the function finishes, it’s popped off the stack.

Important:
The call stack is single-threaded, meaning only one thing can run here at a time.
Maximum capacity is 16000 functions at a time.

Example:

```
function a() {
  b();
}
function b() {
  console.log("Hello");
}
a();
```
Call stack flow:
- a() pushed
- b() pushed
- console.log() pushed
- console.log() popped
- b() popped
- a() popped


#### 2️⃣ Heap
What it is:
An area in memory where objects are stored.

How it works:
Whenever you create an object, array, or function, it’s allocated in the heap.

Example:
```
const user = { name: "Alice" }; // stored in heap
```
You don’t usually interact with the heap directly—JavaScript manages it.

#### 3️⃣ Web APIs / Node APIs
What they are:
Features provided outside the JavaScript engine, by the environment (browser or Node.js).

Examples in browsers:
- setTimeout
- fetch
- DOM events (addEventListener)

Examples in Node.js:
- File system (fs.readFile)
- Timers
- HTTP

How it works:
When you call setTimeout, the timer runs in the browser APIs, not in the call stack.

#### 4️⃣ Callback Queue (Task Queue / Message Queue)
What it is:
A queue holding callbacks that are ready to run after the stack is empty.

Example:
```
console.log("Start");
setTimeout(() => console.log("Timer done"), 0);
console.log("End");
```

Output:
```
Start
End
Timer done
```

The timeout callback waits in the queue until the stack is clear.

#### 5️⃣ Event Loop
What it is:
The orchestrator that constantly:
- Checks if the call stack is empty
- If it is, it takes the first callback from the queue and puts it on the stack

How it works:
Keeps looping forever: stack empty? Move a callback in. Repeat.

#### 6️⃣ Microtask Queue
What it is:
A special high-priority queue mainly for Promises.

How it works:
After the current stack finishes, all microtasks are processed before other callbacks.

Example:
```
console.log("Start");

Promise.resolve().then(() => console.log("Promise resolved"));

console.log("End");
```

Output:
```
Start
End
Promise resolved
```
