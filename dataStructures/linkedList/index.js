/* * Linked List Implementation
 * This code defines a simple linked list with methods to append nodes.
 * Each node contains a value and a reference to the next node.
 * The linked list maintains a reference to the head and tail nodes,
 * as well as the length of the list.
*/
class Node {
  constructor(value) {
    this.value = value; // The value stored in the node
    this.next = null; // A reference to the next node in the list
  } 
}

class LinkedList {
  constructor() {
    this.head = null; // The first node in the list
    this.tail = null; // The last node in the list
    this.length = 0;  // The number of nodes in the list
  }

  append(value) { // Adds a new node with the specified value to the end of the list
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  prepend(value) { // Adds a new node with the specified value to the beginning of the list
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  find(value) { // Searches for a node with the specified value and returns it if found
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  delete(value) { // Removes the first node with the specified value from the list
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.length--;
      return;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      if (currentNode.next.value === value) {
        currentNode.next = currentNode.next.next;
        if (!currentNode.next) {
          this.tail = currentNode;
        }
        this.length--;
        return;
      }
      currentNode = currentNode.next;
    }
  }

  print() { // Prints the values of the nodes in the list in order
    let currentNode = this.head;
    let str = currentNode ? `${currentNode.value}` : 'List is empty';

    while (currentNode && currentNode.next) {
      currentNode = currentNode.next;
      str += ` -> ${currentNode.value}`;
    }
    console.log(str);
  }
}

const linkedList = new LinkedList();
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.print(); // 2 -> 3 -> 4

linkedList.prepend(1);
linkedList.print(); // 1 -> 2 -> 3 -> 4
console.log("length:", linkedList.length); // 4
console.log("found node with value 3:", linkedList.find(3)); // { value: 3, next: { value: 4, next: null } }

linkedList.delete(2);
linkedList.print(); // 1 -> 3 -> 4
