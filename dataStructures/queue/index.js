class Queue {
  constructor() {
    this.items = [];
  }

  // Add to the end (enqueue)
  enqueue(item) {
    this.items.push(item);
  }

  // Remove from the front (dequeue)
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  // Peek at the front item
  peek() {
    return this.isEmpty() ? null : this.items[0];
  }

  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get queue size
  size() {
    return this.items.length;
  }

  // Print the queue
  print() {
    console.log(this.items.join(" <- "));
  }
}

const q = new Queue();

q.enqueue("A");
q.enqueue("B");
q.enqueue("C");

q.print(); // A <- B <- C

console.log("Dequeued:", q.dequeue()); // A
q.print(); // B <- C

console.log("Front item:", q.peek()); // B
