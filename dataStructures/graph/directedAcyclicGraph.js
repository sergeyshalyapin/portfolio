class DAG {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Add directed edge from `from` to `to`
  addEdge(from, to) {
    this.addVertex(from);
    this.addVertex(to);
    this.adjacencyList[from].push(to);
  }

  // Print graph
  print() {
    for (let vertex in this.adjacencyList) {
      if (this.adjacencyList[vertex].length === 0) continue;
      console.log(`${vertex} -> ${this.adjacencyList[vertex].join(', ')}`);
    }
  }
}

const dag = new DAG();

// Add edges (A → B, A → C, B → D, C → D, D → E)
dag.addEdge("A", "B");
dag.addEdge("A", "C");
dag.addEdge("B", "D");
dag.addEdge("C", "D");
dag.addEdge("D", "E");

dag.print();
