class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // Add a vertex (node)
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Add an undirected edge between two vertices
  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  // Remove an edge
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      v => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      v => v !== vertex1
    );
  }

  // Remove a vertex and all its edges
  removeVertex(vertex) {
    while (this.adjacencyList[vertex]?.length) {
      const neighbor = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, neighbor);
    }
    delete this.adjacencyList[vertex];
  }

  // Print the graph
  print() {
    for (let vertex in this.adjacencyList) {
      console.log(`${vertex} -> ${this.adjacencyList[vertex].join(", ")}`);
    }
  }
}

const g = new Graph();

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "D");

g.print();
// A -> B, C
// B -> A, D
// C -> A, D
// D -> B, C

g.removeEdge("A", "C");
g.print();
// A -> B
// B -> A, D
// C -> D
// D -> B, C
