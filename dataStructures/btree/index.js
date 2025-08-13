class BTreeNode {
  constructor(isLeaf = true) {
    this.keys = [];
    this.children = [];
    this.isLeaf = isLeaf;
  }

  // Insert into non-full node
  insertNonFull(key) {
    let i = this.keys.length - 1;

    if (this.isLeaf) {
      // Insert in correct position in keys
      while (i >= 0 && key < this.keys[i]) {
        i--;
      }
      this.keys.splice(i + 1, 0, key);
    } else {
      // Move down to the correct child
      while (i >= 0 && key < this.keys[i]) {
        i--;
      }
      i++;
      if (this.children[i].keys.length === 2) {
        this.splitChild(i);
        if (key > this.keys[i]) {
          i++;
        }
      }
      this.children[i].insertNonFull(key);
    }
  }

  // Split full child into two and promote middle key
  splitChild(i) {
    const y = this.children[i];
    const z = new BTreeNode(y.isLeaf);
    const mid = y.keys[1];

    z.keys = y.keys.splice(2);
    const middle = y.keys.pop();

    if (!y.isLeaf) {
      z.children = y.children.splice(2);
    }

    this.children.splice(i + 1, 0, z);
    this.keys.splice(i, 0, middle);
  }
}

class BTree {
  constructor() {
    this.root = new BTreeNode();
  }

  insert(key) {
    const root = this.root;
    if (root.keys.length === 2) {
      const newRoot = new BTreeNode(false);
      newRoot.children.push(root);
      newRoot.splitChild(0);
      this.root = newRoot;
    }

    this.root.insertNonFull(key);
  }

  print(node = this.root, level = 0) {
    console.log("  ".repeat(level) + "[" + node.keys.join(", ") + "]");
    if (!node.isLeaf) {
      for (const child of node.children) {
        this.print(child, level + 1);
      }
    }
  }
}

const tree = new BTree();

[10, 20, 5, 6, 12, 30, 7, 17].forEach(num => tree.insert(num));

tree.print();
