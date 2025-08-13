class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Add edge with weight (undirected by default)
  addEdge(vertex1, vertex2, weight) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  print() {
    for (let vertex in this.adjacencyList) {
      const edges = this.adjacencyList[vertex]
        .map(edge => `${edge.node} (${edge.weight})`)
        .join(', ');
      console.log(`${vertex} -> ${edges}`);
    }
  }
}

const graph = new WeightedGraph();

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "C", 1);
graph.addEdge("B", "D", 5);
graph.addEdge("C", "D", 8);
graph.addEdge("C", "E", 10);
graph.addEdge("D", "E", 2);
graph.addEdge("D", "Z", 6);
graph.addEdge("E", "Z", 3);

graph.print();