class BellmanFord {
  constructor() {
    this.edges = [];
    this.vertices = new Set();
  }

  addEdge(from, to, weight) {
    this.edges.push({ from, to, weight });
    this.vertices.add(from);
    this.vertices.add(to);
  }

  findShortestPaths(start) {
    const distances = {};
    const prev = {};

    // Step 1: Initialize distances
    for (let v of this.vertices) {
      distances[v] = Infinity;
      prev[v] = null;
    }
    distances[start] = 0;

    // Step 2: Relax edges (V - 1) times
    for (let i = 0; i < this.vertices.size - 1; i++) {
      for (let edge of this.edges) {
        const { from, to, weight } = edge;
        if (distances[from] + weight < distances[to]) {
          distances[to] = distances[from] + weight;
          prev[to] = from;
        }
      }
    }

    // Step 3: Check for negative weight cycles
    for (let edge of this.edges) {
      const { from, to, weight } = edge;
      if (distances[from] + weight < distances[to]) {
        throw new Error("Graph contains a negative weight cycle");
      }
    }

    return { distances, previous: prev };
  }

  // Optional: Reconstruct path from start to target
  getPath(previous, target) {
    const path = [];
    let current = target;
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
    return path;
  }
}

const graph = new BellmanFord();

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "C", -2);
graph.addEdge("C", "D", 2);
graph.addEdge("D", "B", 1);
graph.addEdge("D", "E", 3);

try {
  const { distances, previous } = graph.findShortestPaths("A");
  console.log("Shortest distances:", distances);
  console.log("Path to E:", graph.getPath(previous, "E"));
} catch (err) {
  console.error(err.message);
}
