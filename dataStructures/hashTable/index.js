class HashTable {
  constructor(size = 53) {
    this.buckets = new Array(size); // array of "buckets"
    this.size = size;
  }

  // Basic hash function for strings
  _hash(key) {
    let total = 0;
    const PRIME = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * PRIME + value) % this.size;
    }

    return total;
  }

  // Insert key-value pair
  set(key, value) {
    const index = this._hash(key);
    if (!this.buckets[index]) this.buckets[index] = [];

    // Check for existing key and overwrite
    for (let pair of this.buckets[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    this.buckets[index].push([key, value]);
  }

  // Retrieve value by key
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    if (bucket) {
      for (let pair of bucket) {
        if (pair[0] === key) return pair[1];
      }
    }

    return undefined;
  }

  // Check if key exists
  has(key) {
    return this.get(key) !== undefined;
  }

  // Optional: Delete key
  delete(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    if (bucket) {
      const idx = bucket.findIndex(pair => pair[0] === key);
      if (idx !== -1) {
        bucket.splice(idx, 1);
        return true;
      }
    }

    return false;
  }
}

const table = new HashTable();

table.set("apple", 100);
table.set("banana", 200);
table.set("orange", 300);

console.log(table.get("banana")); // 200
console.log(table.has("apple"));  // true

table.set("banana", 250); // Update
console.log(table.get("banana")); // 250

table.delete("orange");
console.log(table.get("orange")); // undefined
