### 🎯 What is the Event Loop?
The Event Loop is the mechanism that makes JavaScript asynchronous and non-blocking, even though it has only one main thread.
<br>


[What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ&ab_channel=JSConf) - conf video

[Loupe](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D) - example environment to test event loop

[Further Adventures of the Event Loop](https://www.youtube.com/watch?v=u1kqx6AenYw&ab_channel=JSConf) - conf video

#### 🧠 How to Think About It
Imagine JavaScript is a chef in a kitchen:

🧑‍🍳 Call Stack = the chef’s hands cooking one dish at a time.

🗂️ Task Queue = a line of tickets for dishes ready to serve later.

🗂️ Microtask Queue = a VIP line of special urgent tickets (like promises).

🍳 Event Loop = the kitchen manager constantly watching:

“Is the chef’s hands (the stack) empty?”

“If yes, give them the next most important ticket.”

#### 🔄 What Does It Do?
The Event Loop constantly does these steps:

1️⃣ Check if the Call Stack is empty.
2️⃣ If yes:
a) Take all microtasks (e.g., resolved promises) from the Microtask Queue and put them on the Call Stack one by one.
b) When microtasks are done, take one task from the Callback Queue and put it on the Call Stack.
3️⃣ Repeat forever.

#### 📈 Why is it Important?
✅ It lets you:
- Run code asynchronously (e.g., after a timeout, or when data arrives).
- Handle many tasks concurrently without blocking the single thread.
- Control execution order of things like Promise callbacks vs. setTimeout.

#### 🧩 Example Walkthrough
```
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

Step by step:

1️⃣ Call Stack:
- console.log("Start") → logs Start
- setTimeout(...) → registers timer with Web APIs (callback scheduled in Callback Queue)
- Promise.resolve().then(...) → schedules callback in Microtask Queue
- console.log("End") → logs End

Call Stack becomes empty

2️⃣ Event Loop:
- Call Stack empty
- Microtask Queue has Promise → moves to Call Stack → logs Promise
- Microtask Queue empty
- Callback Queue has setTimeout → moves to Call Stack → logs Timeout

Output:
```
Start
End
Promise
Timeout
```

#### 📝 One-Sentence Definition
The Event Loop is the process that coordinates the execution of synchronous and asynchronous code in JavaScript by moving tasks from the queues into the call stack whenever it is empty.
<br>

### Rendering in Browsers

In browsers, the render queue isn’t an official term but describes the internal process the browser uses to schedule visual updates.

How it works:
- JavaScript changes the DOM or styles.
- Browser queues up render work, like recalculating layout and repainting pixels.
- These updates happen asynchronously during the rendering pipeline, usually synced to the next animation frame (~16ms, 60fps).

Key concepts related to this:
- Reflow (Layout): Compute positions and sizes.
- Repaint: Draw pixels.
- Composite: Put layers together.

RequestAnimationFrame(): Lets you schedule code to run before the next repaint.

✅ Example:
```
requestAnimationFrame(() => {
  // This runs right before the browser repaints
  myElement.style.transform = 'translateX(100px)';
});
```
So when people mention a render queue in web dev, they usually mean the browser’s internal scheduling of rendering work after JavaScript changes.
<br>

### 🟢 1. The Browser Rendering Pipeline
When you make a change in JavaScript (e.g., .style, class, or DOM), the browser doesn’t instantly redraw the screen. Instead, it queues rendering work into a pipeline:
<br>

#### JavaScript Execution

Your JS runs and updates the DOM or CSSOM.

Example:
```
element.style.width = "300px";
```
<br>

#### Style Calculation

Browser computes which CSS rules now apply to elements.
<br>

#### Layout (Reflow)

Computes where every element goes and how big it is.

Expensive if many elements are affected.
<br>

#### Paint

Fills pixels: colors, text, images, borders.

#### Composite Layers

Combines painted layers into the final image on screen.

✅ Render queue informally refers to the tasks queued between these phases before the next screen update.
<br>

### 🟢 2. Why Is This Important?
Because rendering isn’t immediate, you can:

Batch DOM changes: Avoid triggering multiple layouts.

Use requestAnimationFrame: Schedule code to run right before the next paint.

Avoid forced synchronous layout (layout thrashing): When you read layout properties immediately after modifying them, you force the browser to flush the queue and compute layout right now.

### 🟢 3. Example of Layout Thrashing

This causes performance problems:
```
// BAD: forces layout after each change
for (let i = 0; i < 100; i++) {
  element.style.width = i + 'px';
  console.log(element.offsetWidth); // Forces layout!
}
```

✅ Better approach:
```
// GOOD: batch writes and reads separately
for (let i = 0; i < 100; i++) {
  element.style.width = i + 'px';
}
console.log(element.offsetWidth); // Only forces layout once
```
<br>

### 🟢 **4. requestAnimationFrame()
This method helps you sync with the rendering pipeline:

```
requestAnimationFrame(() => {
  element.style.transform = "translateX(100px)";
});
```
Your callback runs right before the browser paints the next frame.

This is ideal for smooth animations.
<br>

### 🟢 5. Frame Timing
Browsers aim for 60 FPS (frames per second).

That gives ~16.6 ms per frame.

JavaScript, layout, paint, and compositing must all fit within this budget to avoid jank.

🟢 Summary
When you hear “render queue” in JS/web context, think:

✅ The system of queued up style/layout/paint/composite operations that the browser batches together and executes before the next frame.

Understanding this helps you write smooth, performant web applications.
