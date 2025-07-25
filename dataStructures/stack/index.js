/**
 * Stack Data Structure
 * 
 * A stack is a linear data structure that follows the Last In First Out (LIFO) principle.
 * The last element added to the stack will be the first one to be removed.
 * 
 * Basic operations:
 * - push(element): Add an element to the top of the stack.
 * - pop(): Remove and return the top element from the stack.
 * - peek(): Return the top element without removing it.
 * - isEmpty(): Check if the stack is empty.
 * - size(): Return the number of elements in the stack.
 */

class Stack {
  constructor() {
    this.items = [];
  }

  // Add element to the top of the stack
  push(element) {
    this.items.push(element);
  }

  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  // Return the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of elements in the stack
  size() {
    return this.items.length;
  }
}

// Example usage:
const stack = new Stack();
stack.push(10);
stack.push(20);
console.log("stack: { items: [", stack.items.join(", "), "] }"); // Stack { items: [ 10, 20 ] }
console.log("stack.peek():", stack.peek()); // 20
console.log("stack.pop():", stack.pop());  // 20
console.log("stack.size():", stack.size()); // 1
stack.push(30);
console.log("stack.push(30)");
console.log("stack: { items: [", stack.items.join(", "), "] }"); // Stack { items: [ 10, 30 ] }

